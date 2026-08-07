"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Lesson = {
  number: string;
  title: string;
  duration: string;
  topics: string[];
};

const lessons: Lesson[] = [
  {
    number: "01",
    title: "The foundations",
    duration: "24 min",
    topics: ["What is a system?", "Thinking in relationships", "Your first mental model"],
  },
  {
    number: "02",
    title: "Inputs & outputs",
    duration: "32 min",
    topics: ["Mapping a process", "Feedback loops", "Boundaries and constraints"],
  },
  {
    number: "03",
    title: "Patterns in motion",
    duration: "28 min",
    topics: ["Reading behavior", "Delays and accumulation", "Common patterns"],
  },
  {
    number: "04",
    title: "Designing change",
    duration: "36 min",
    topics: ["Finding leverage", "Testing interventions", "Learning from outcomes"],
  },
];

const topicCopy: Record<string, { eyebrow: string; intro: string }> = {
  "What is a system?": {
    eyebrow: "Lesson 01 · The foundations",
    intro: "A system is more than a collection of parts. It is a set of connected elements that work together—often in ways that are surprising—to produce a pattern of behavior over time.",
  },
  "Thinking in relationships": {
    eyebrow: "Lesson 01 · The foundations",
    intro: "The most useful shift in systems thinking is moving your attention from individual objects to the relationships between them.",
  },
  "Your first mental model": {
    eyebrow: "Lesson 01 · The foundations",
    intro: "Mental models make invisible assumptions visible. A simple model helps us ask better questions before we rush toward an answer.",
  },
};

export default function Home() {
  const [openLessons, setOpenLessons] = useState<number[]>([0]);
  const [activeTopic, setActiveTopic] = useState("What is a system?");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleLesson = (index: number) => {
    setOpenLessons((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const selectTopic = (topic: string) => {
    setActiveTopic(topic);
    setMenuOpen(false);
  };

  const copy = topicCopy[activeTopic] ?? {
    eyebrow: "Course topic",
    intro: "This topic is ready for its lesson content, examples, and diagrams.",
  };

  const sidebar = (
    <>
      <div className={styles.brand}>
        <span className={styles.brandMark}>L</span>
        <span>Latitude</span>
      </div>
      <div className={styles.courseMeta}>
        <span className={styles.overline}>Course 01</span>
        <h2>Systems thinking,<br />made simple.</h2>
        <div className={styles.progressRow}>
          <span>8% complete</span>
          <span>1 / 12</span>
        </div>
        <div className={styles.progressTrack}><span /></div>
      </div>
      <nav className={styles.lessonNav} aria-label="Course lessons">
        {lessons.map((lesson, index) => {
          const isOpen = openLessons.includes(index);
          return (
            <div className={styles.lesson} key={lesson.number}>
              <button
                className={styles.lessonHeader}
                onClick={() => toggleLesson(index)}
                aria-expanded={isOpen}
              >
                <span className={styles.lessonNumber}>{lesson.number}</span>
                <span className={styles.lessonTitle}>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.duration}</small>
                </span>
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>⌄</span>
              </button>
              <div className={`${styles.topicList} ${isOpen ? styles.topicListOpen : ""}`}>
                {lesson.topics.map((topic, topicIndex) => (
                  <button
                    key={topic}
                    className={`${styles.topicButton} ${activeTopic === topic ? styles.topicActive : ""}`}
                    onClick={() => selectTopic(topic)}
                  >
                    <span>{String(topicIndex + 1).padStart(2, "0")}</span>
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>
      <div className={styles.sidebarFooter}>
        <span className={styles.avatar}>AK</span>
        <span><strong>Alex Kim</strong><small>Learning space</small></span>
        <button aria-label="Open settings">•••</button>
      </div>
    </>
  );

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>{sidebar}</aside>
      {menuOpen && <button className={styles.backdrop} onClick={() => setMenuOpen(false)} aria-label="Close lesson menu" />}
      <aside className={`${styles.mobileSidebar} ${menuOpen ? styles.mobileSidebarOpen : ""}`}>{sidebar}</aside>

      <section className={styles.content}>
        <header className={styles.topbar}>
          <button className={styles.menuButton} onClick={() => setMenuOpen(true)} aria-label="Open lesson menu">☰</button>
          <div className={styles.breadcrumb}><span>Lesson 01</span><b>/</b><strong>{activeTopic}</strong></div>
          <div className={styles.topActions}>
            <button aria-label="Bookmark this topic">◇</button>
            <button aria-label="More options">•••</button>
          </div>
        </header>

        <article className={styles.article}>
          <div className={styles.articleIntro}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1>{activeTopic}</h1>
            <p className={styles.lead}>{copy.intro}</p>
          </div>

          <div className={styles.diagram} aria-label="Placeholder for a future systems diagram">
            <div className={`${styles.node} ${styles.nodeOne}`}><span>01</span>Elements</div>
            <div className={`${styles.node} ${styles.nodeTwo}`}><span>02</span>Connections</div>
            <div className={`${styles.node} ${styles.nodeThree}`}><span>03</span>Purpose</div>
            <div className={styles.orbit} />
            <div className={styles.diagramLabel}>A system</div>
            <p>We’ll turn this space into an interactive diagram.</p>
          </div>

          <div className={styles.readingGrid}>
            <div>
              <p className={styles.sectionNumber}>01 — Start here</p>
              <h2>Look beyond<br />the individual parts.</h2>
            </div>
            <div className={styles.bodyCopy}>
              <p>Think of a forest. Trees, soil, water, animals, and climate all matter—but the forest emerges from how those pieces affect one another.</p>
              <p>The same is true for a team, a city, or a product. To understand the whole, we need to study both the parts and the relationships holding them together.</p>
              <aside><span>Remember</span>A system’s behavior belongs to the whole. You can’t find it by examining one part in isolation.</aside>
            </div>
          </div>

          <footer className={styles.nextTopic}>
            <span><small>Up next</small><strong>Thinking in relationships</strong></span>
            <button onClick={() => selectTopic("Thinking in relationships")}>Continue <span>→</span></button>
          </footer>
        </article>
      </section>
    </main>
  );
}
