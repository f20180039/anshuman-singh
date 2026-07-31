import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  FaBriefcase,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaLock,
  FaGlobe,
  FaLinkedin,
} from "react-icons/fa";
import BackgroundManager from "../common/components/backgrounds/BackgroundManager";
import { C_JOB_PROFILE_URL, C_JOBS_FEED_URL } from "../common/constants";

// ---- Types matching the public JSON files ----------------------------------
interface JobProfile {
  identity: { fullName: string; headline: string; location: string; linkedin: string };
  experience: { years: number; currentTitle: string; currentCompany: string; noticePeriod: string };
  compensation: { expectedMinLPA: number; expectedNote: string };
  locationPreferences: {
    priorityCountries: string[];
    openRegions: string[];
    remoteWorldwide: boolean;
    needsSponsorship: boolean;
    summary: string;
  };
  roles: string[];
  highlights: string[];
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  source: string;
  posted: string | null;
  score: number;
  regions: string[];
  sponsorshipFriendly: boolean;
}

interface JobsFeed {
  generatedAt: string;
  count: number;
  jobs: Job[];
}

// Soft gate: hides the dashboard from casual visitors. NOT real security — the
// feed JSON is public. This just keeps the page tidy for recruiters landing on it.
const GATE_PHRASE = "letmein";

const Jobs = () => {
  const [profile, setProfile] = useState<JobProfile | null>(null);
  const [feed, setFeed] = useState<JobsFeed | null>(null);
  const [feedError, setFeedError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [phrase, setPhrase] = useState("");

  // Filters for the dashboard
  const [regionFilter, setRegionFilter] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sponsorOnly, setSponsorOnly] = useState(false);

  useEffect(() => {
    fetch(C_JOB_PROFILE_URL)
      .then((r) => r.json())
      .then(setProfile)
      .catch(() => setProfile(null));
    fetch(C_JOBS_FEED_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setFeed)
      .catch(() => setFeedError(true));
  }, []);

  const regions = useMemo(() => {
    const set = new Set<string>();
    feed?.jobs.forEach((j) => j.regions.forEach((r) => set.add(r)));
    return ["All", ...Array.from(set).sort()];
  }, [feed]);

  const visibleJobs = useMemo(() => {
    if (!feed) return [];
    return feed.jobs.filter((j) => {
      if (regionFilter !== "All" && !j.regions.includes(regionFilter)) return false;
      if (remoteOnly && !j.remote) return false;
      if (sponsorOnly && !j.sponsorshipFriendly) return false;
      return true;
    });
  }, [feed, regionFilter, remoteOnly, sponsorOnly]);

  return (
    <BackgroundManager showGrid showGradient gradientIntensity="medium">
      <section className="ans-w-full ans-min-h-screen ans-py-xxlarge ans-px-6 sm:ans-px-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="ans-max-w-6xl ans-mx-auto"
        >
          {/* Header */}
          <div className="ans-text-center ans-mb-xlarge">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="ans-inline-flex ans-items-center ans-justify-center ans-w-16 ans-h-16 ans-bg-th-accent/10 ans-rounded-full ans-mb-4"
            >
              <FaBriefcase className="ans-text-7 ans-text-th-accent" />
            </motion.div>
            <h1 className="ans-text-6 ans-font-inter-1 ans-text-th-accent retro-glow ans-mb-3">
              Open to Work
            </h1>
            <p className="ans-text-3 ans-text-th-muted-fg ans-max-w-2xl ans-mx-auto">
              Availability, preferences, and a live board of matched roles.
            </p>
          </div>

          {/* ================= ZONE 1 — Open-to-work summary ================= */}
          {profile && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="ans-bg-th-card ans-rounded-2xl ans-p-8 ans-shadow-lg ans-border ans-border-th-border ans-mb-xlarge"
            >
              <div className="ans-flex ans-items-center ans-gap-2 ans-mb-6">
                <span className="ans-inline-block ans-w-3 ans-h-3 ans-rounded-full ans-bg-green-500 ans-animate-pulse" />
                <span className="ans-text-3 ans-font-inter-1 ans-text-th-fg">
                  Actively looking · {profile.experience.years}+ yrs
                </span>
              </div>

              <div className="ans-grid ans-grid-cols-1 md:ans-grid-cols-2 ans-gap-6">
                <SummaryItem label="Target roles" value={profile.roles.join(" · ")} />
                <SummaryItem label="Notice period" value={profile.experience.noticePeriod} />
                <SummaryItem label="Expected (base)" value={profile.compensation.expectedNote} />
                <SummaryItem
                  label="Currently"
                  value={`${profile.experience.currentTitle} @ ${profile.experience.currentCompany}`}
                />
              </div>

              <div className="ans-mt-6 ans-pt-6 ans-border-t ans-border-th-border">
                <p className="ans-text-2 ans-text-th-muted-fg ans-uppercase ans-tracking-wide ans-mb-2 ans-flex ans-items-center ans-gap-2">
                  <FaGlobe className="ans-text-th-accent" /> Location & mobility
                </p>
                <p className="ans-text-2 ans-text-th-secondary-fg ans-leading-relaxed">
                  {profile.locationPreferences.summary}
                </p>
                <div className="ans-flex ans-flex-wrap ans-gap-2 ans-mt-3">
                  {profile.locationPreferences.priorityCountries.map((c) => (
                    <Tag key={c} highlight>{c} (priority)</Tag>
                  ))}
                  {profile.locationPreferences.openRegions.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                  {profile.locationPreferences.remoteWorldwide && <Tag>Remote worldwide</Tag>}
                </div>
              </div>

              <div className="ans-mt-6 ans-pt-6 ans-border-t ans-border-th-border">
                <ul className="ans-space-y-2">
                  {profile.highlights.map((h, i) => (
                    <li key={i} className="ans-flex ans-items-start ans-gap-3 ans-text-2 ans-text-th-secondary-fg">
                      <span className="ans-text-th-accent ans-mt-1">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={profile.identity.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="ans-inline-flex ans-items-center ans-gap-2 ans-bg-th-accent ans-text-White ans-px-4 ans-py-2 ans-rounded-lg ans-text-2 ans-font-semibold hover:ans-bg-th-accent/90 ans-transition-colors ans-mt-6"
              >
                <FaLinkedin /> <span>Connect on LinkedIn</span>
              </a>
            </motion.div>
          )}

          {/* ================= ZONE 2 — Matched-jobs dashboard ================= */}
          <div className="ans-mb-6">
            <h2 className="ans-text-5 ans-font-inter-1 ans-text-th-accent ans-mb-2">
              Matched roles
            </h2>
            {feed && (
              <p className="ans-text-2 ans-text-th-muted-fg">
                {feed.count} roles · updated {new Date(feed.generatedAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {!unlocked ? (
            <div className="ans-bg-th-card ans-rounded-2xl ans-p-8 ans-shadow-lg ans-border ans-border-th-border ans-text-center">
              <FaLock className="ans-text-7 ans-text-th-accent ans-mx-auto ans-mb-4" />
              <p className="ans-text-2 ans-text-th-secondary-fg ans-mb-4 ans-max-w-md ans-mx-auto">
                The matched-jobs board is tucked behind a passphrase to keep this page tidy.
                (These are public job posts — the gate is convenience, not security.)
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setUnlocked(phrase.trim().toLowerCase() === GATE_PHRASE);
                }}
                className="ans-flex ans-gap-2 ans-justify-center ans-max-w-sm ans-mx-auto"
              >
                <input
                  type="password"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  placeholder="Passphrase"
                  className="ans-flex-1 ans-px-3 ans-py-2 ans-rounded-lg ans-bg-th-bg ans-border ans-border-th-border ans-text-th-fg focus:ans-border-th-accent ans-outline-none"
                />
                <button
                  type="submit"
                  className="ans-bg-th-accent ans-text-White ans-px-4 ans-py-2 ans-rounded-lg ans-font-semibold hover:ans-bg-th-accent/90"
                >
                  Unlock
                </button>
              </form>
            </div>
          ) : feedError ? (
            <p className="ans-text-2 ans-text-th-muted-fg">
              No feed yet — the daily job hasn't produced listings. Check back after 9 AM IST.
            </p>
          ) : (
            <>
              {/* Filters */}
              <div className="ans-flex ans-flex-wrap ans-gap-3 ans-mb-4 ans-items-center">
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="ans-px-3 ans-py-2 ans-rounded-lg ans-bg-th-card ans-border ans-border-th-border ans-text-th-fg ans-text-2"
                >
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <label className="ans-flex ans-items-center ans-gap-2 ans-text-2 ans-text-th-secondary-fg ans-cursor-pointer">
                  <input type="checkbox" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} />
                  Remote only
                </label>
                <label className="ans-flex ans-items-center ans-gap-2 ans-text-2 ans-text-th-secondary-fg ans-cursor-pointer">
                  <input type="checkbox" checked={sponsorOnly} onChange={(e) => setSponsorOnly(e.target.checked)} />
                  Sponsorship-friendly
                </label>
                <span className="ans-text-2 ans-text-th-muted-fg ans-ml-auto">
                  {visibleJobs.length} shown
                </span>
              </div>

              {/* Job cards */}
              <div className="ans-space-y-3">
                {visibleJobs.map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="ans-bg-th-card ans-rounded-xl ans-p-5 ans-border ans-border-th-border hover:ans-border-th-accent/50 ans-transition-all"
                  >
                    <div className="ans-flex ans-items-start ans-justify-between ans-gap-4">
                      <div className="ans-flex-1 ans-min-w-0">
                        <h3 className="ans-text-3 ans-font-inter-1 ans-text-th-fg ans-mb-1">{job.title}</h3>
                        <p className="ans-text-2 ans-text-th-accent ans-font-semibold">{job.company}</p>
                        <p className="ans-text-2 ans-text-th-muted-fg ans-flex ans-items-center ans-gap-1 ans-mt-1">
                          <FaMapMarkerAlt className="ans-text-xs" /> {job.location}
                        </p>
                        <div className="ans-flex ans-flex-wrap ans-gap-2 ans-mt-2">
                          {job.remote && <Tag>Remote</Tag>}
                          {job.regions.map((r) => <Tag key={r}>{r}</Tag>)}
                          {job.sponsorshipFriendly && <Tag highlight>Sponsorship</Tag>}
                          <Tag>{job.source}</Tag>
                        </div>
                      </div>
                      <div className="ans-flex ans-flex-col ans-items-end ans-gap-2 ans-shrink-0">
                        <span
                          className="ans-text-xs ans-font-bold ans-px-2 ans-py-1 ans-rounded-full ans-bg-th-accent/10 ans-text-th-accent"
                          title="Match score"
                        >
                          {job.score}
                        </span>
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ans-inline-flex ans-items-center ans-gap-1 ans-bg-th-accent ans-text-White ans-px-3 ans-py-2 ans-rounded-lg ans-text-2 ans-font-semibold hover:ans-bg-th-accent/90 ans-whitespace-nowrap"
                        >
                          Apply <FaExternalLinkAlt className="ans-text-xs" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {visibleJobs.length === 0 && (
                  <p className="ans-text-2 ans-text-th-muted-fg ans-text-center ans-py-8">
                    No roles match these filters.
                  </p>
                )}
              </div>
            </>
          )}
        </motion.div>
      </section>
    </BackgroundManager>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="ans-text-2 ans-text-th-muted-fg ans-uppercase ans-tracking-wide ans-mb-1">{label}</p>
    <p className="ans-text-2 ans-text-th-fg ans-font-semibold">{value}</p>
  </div>
);

const Tag = ({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) => (
  <span
    className={
      "ans-text-xs ans-px-2 ans-py-1 ans-rounded-full " +
      (highlight
        ? "ans-bg-th-accent ans-text-White"
        : "ans-bg-th-accent/10 ans-text-th-accent")
    }
  >
    {children}
  </span>
);

export default Jobs;
