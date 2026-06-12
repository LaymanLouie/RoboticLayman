import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Plus, Trash2, NotebookPen } from "lucide-react";
import PageWrapper from "@/layout/PageWrapper";
import PageHeader from "@/components/primitives/PageHeader";
import PageTitle from "@/components/primitives/PageTitle";
import usePageTitle from "@/hooks/usePageTitle";

interface Note {
  id: string;
  title: string;
  body: string;
  updatedAt: number;
}

const STORAGE_KEY = "layman.dashboard.notes.v1";
const ACTIVE_KEY = "layman.dashboard.notes.active.v1";

function loadNotes(): Note[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveNotes(notes: Note[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    return;
  }
}

function createNote(): Note {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: "New Note",
    body: "",
    updatedAt: Date.now(),
  };
}

function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const minute = 60_000;
  const hour = 60 * minute;
  const day = 24 * hour;
  if (diff < minute) return "just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  return `${Math.floor(diff / day)}d ago`;
}

const Notes = memo(function DashboardNotes() {
  usePageTitle("Notes");

  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [activeId, setActiveId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(ACTIVE_KEY);
    } catch {
      return null;
    }
  });

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  useEffect(() => {
    try {
      if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
      else localStorage.removeItem(ACTIVE_KEY);
    } catch {
      return;
    }
  }, [activeId]);

  const sortedNotes = useMemo(
    () => [...notes].sort((a, b) => b.updatedAt - a.updatedAt),
    [notes],
  );

  const active = useMemo(
    () => notes.find((n) => n.id === activeId) ?? null,
    [notes, activeId],
  );

  const handleNew = useCallback(() => {
    const note = createNote();
    setNotes((prev) => [note, ...prev]);
    setActiveId(note.id);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setActiveId((curr) => (curr === id ? null : curr));
  }, []);

  const handleUpdate = useCallback(
    (id: string, patch: Partial<Pick<Note, "title" | "body">>) => {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n,
        ),
      );
    },
    [],
  );

  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (active && bodyRef.current) {
      bodyRef.current.style.height = "auto";
      bodyRef.current.style.height = `${Math.max(bodyRef.current.scrollHeight, 400)}px`;
    }
  }, [active?.id, active?.body]);

  return (
    <PageWrapper>
      <PageHeader
        title={<PageTitle rest="Notes" />}
        subtitle="A notepad. Always here for you!"
        meta={
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        }
      />

      <section className="pb-24 px-6">
        <div className="max-w-6xl 3xl:max-w-7xl 4xl:max-w-[100rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] 3xl:grid-cols-[340px_1fr] gap-6">
            <aside className="rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/30 p-4 h-fit lg:sticky lg:top-20">
              <button
                type="button"
                onClick={handleNew}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary/15 hover:bg-primary/25 border border-primary/30 hover:border-primary/60 text-foreground font-medium transition-all duration-200 hover:scale-[1.02]"
              >
                <Plus className="w-4 h-4" />
                New Note
              </button>

              <div className="mt-4 space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
                {sortedNotes.length === 0 && (
                  <p className="text-sm text-muted-foreground/70 text-center py-6">
                    No notes yet.
                  </p>
                )}
                {sortedNotes.map((note) => {
                  const isActive = note.id === activeId;
                  return (
                    <div
                      key={note.id}
                      className={`group flex items-center gap-1 rounded-xl border transition-all duration-200 ${
                        isActive
                          ? "bg-primary/15 border-primary/40"
                          : "bg-card/40 border-border/20 hover:border-border/40"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(note.id)}
                        className="flex-1 min-w-0 text-left px-3 py-2"
                      >
                        <p className="text-sm font-medium truncate">
                          {note.title || ""}
                        </p>
                        <p className="text-[11px] text-muted-foreground/70">
                          {formatRelative(note.updatedAt)}
                        </p>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(note.id)}
                        aria-label={`Delete ${note.title}`}
                        className="shrink-0 p-2 mr-1 rounded-lg text-muted-foreground/60 hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </aside>

            <div className="rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/30 p-5 sm:p-7 min-h-[60vh]">
              {active ? (
                <div className="flex flex-col gap-4 h-full">
                  <input
                    type="text"
                    value={active.title}
                    onChange={(e) =>
                      handleUpdate(active.id, { title: e.target.value })
                    }
                    placeholder="New Note"
                    className="w-full bg-transparent border-0 border-b border-border/20 focus:border-primary/50 focus:outline-none text-2xl sm:text-3xl font-bold tracking-tight pb-2 transition-colors placeholder:text-muted-foreground/40"
                  />
                  <p className="text-xs text-muted-foreground/70">
                    Last updated {formatRelative(active.updatedAt)}
                  </p>
                  <textarea
                    ref={bodyRef}
                    value={active.body}
                    onChange={(e) =>
                      handleUpdate(active.id, { body: e.target.value })
                    }
                    placeholder="Here's the start of an awesome idea."
                    className="w-full flex-1 min-h-[400px] bg-transparent border-0 focus:outline-none resize-none text-base leading-relaxed text-foreground/90 placeholder:text-muted-foreground/40"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-4">
                    <NotebookPen className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Note Selected</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Pick a note from the sidebar or start a fresh one.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
});

export default Notes;
