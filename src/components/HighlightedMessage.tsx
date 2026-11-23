import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useAppContext } from '../context/ResultContext';
import type { LinkFinding, RedFlag, Verdict } from '../types';

interface HighlightedMessageProps {
  message: string;
  redFlags: RedFlag[];
  links?: LinkFinding[];
  verdict?: Verdict;
}

interface HighlightMatch {
  start: number;
  end: number;
  tagNumber: number;
  isHighRisk: boolean;
}

export function HighlightedMessage({
  message,
  redFlags,
  links = [],
  verdict = 'likely_scam',
}: HighlightedMessageProps) {
  const { liteMode } = useAppContext();
  const prefersReduced = useReducedMotion();
  const disableMotion = liteMode || prefersReduced;

  if (!message) {
    return null;
  }

  const lowerMessage = message.toLowerCase();
  const matches: HighlightMatch[] = [];

  const isOccupied = (start: number, end: number) =>
    matches.some((m) => start < m.end && end > m.start);

  // Match red_flags[].evidence case-insensitively, preserving flag index (1-based)
  redFlags.forEach((flag, idx) => {
    const ev = flag.evidence?.trim();
    if (!ev || ev.length < 2) return;

    const lowerEv = ev.toLowerCase();
    let searchFrom = 0;
    while (searchFrom < lowerMessage.length) {
      const foundIdx = lowerMessage.indexOf(lowerEv, searchFrom);
      if (foundIdx === -1) break;
      const end = foundIdx + ev.length;
      if (!isOccupied(foundIdx, end)) {
        matches.push({
          start: foundIdx,
          end,
          tagNumber: idx + 1,
          isHighRisk: verdict === 'likely_scam',
        });
        break;
      }
      searchFrom = foundIdx + 1;
    }
  });

  // Also highlight any links[].url not already highlighted
  links.forEach((link) => {
    if (link.risk === 'low') return;
    const url = link.url?.trim();
    if (!url || url.length < 3) return;
    const lowerUrl = url.toLowerCase();
    const foundIdx = lowerMessage.indexOf(lowerUrl);
    if (foundIdx !== -1) {
      const end = foundIdx + url.length;
      if (!isOccupied(foundIdx, end)) {
        matches.push({
          start: foundIdx,
          end,
          tagNumber: redFlags.length + 1,
          isHighRisk: link.risk === 'high',
        });
      }
    }
  });

  matches.sort((a, b) => a.start - b.start);

  const segments: React.ReactNode[] = [];
  let cursor = 0;

  matches.forEach((match, i) => {
    if (match.start > cursor) {
      segments.push(
        <span key={`txt-${i}`}>{message.slice(cursor, match.start)}</span>,
      );
    }

    const color = match.isHighRisk ? '#FF5C8A' : '#FFC24D';
    const bg = match.isHighRisk
      ? 'rgba(255, 92, 138, 0.22)'
      : 'rgba(255, 194, 77, 0.22)';

    segments.push(
      <motion.mark
        key={`mark-${i}`}
        initial={disableMotion ? { opacity: 1 } : { opacity: 0.4, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: disableMotion ? 0 : i * 0.12 }}
        style={{
          backgroundColor: bg,
          color: '#F4F6FF',
          borderBottom: `2px solid ${color}`,
          boxShadow: `0 0 14px ${bg}`,
        }}
        className="inline rounded-md px-1.5 py-0.5 mx-0.5 font-semibold"
      >
        {message.slice(match.start, match.end)}
        <sup
          style={{ backgroundColor: color, color: '#0A0F24' }}
          className="ml-1 inline-flex items-center justify-center rounded-full px-1.5 text-[11px] font-extrabold leading-tight align-middle"
        >
          {match.tagNumber}
        </sup>
      </motion.mark>,
    );

    cursor = match.end;
  });

  if (cursor < message.length) {
    segments.push(<span key="txt-end">{message.slice(cursor)}</span>);
  }

  return (
    <div className="glass-surface p-5 sm:p-6">
      <p className="font-mono-msg text-[16px] sm:text-[17px] leading-[1.75] text-[#F4F6FF] whitespace-pre-wrap break-words">
        {segments}
      </p>
    </div>
  );
}
