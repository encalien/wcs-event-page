/**
 * Event-specific settings. This file is CONTENT: each events/* branch keeps its own copy.
 * Everything else outside the content folders is shared code and is edited on main only.
 */
const eventConfig = {
  /** Shown in the browser tab and when the link is shared */
  title: "Fall Focus WCS 2026",
  description: "West Coast Swing intensive workshop in Ljubljana",
  /** Public URL, used for og:url */
  url: "https://fallfocuswcs.dance",
  /** Folder on the server: /var/www/<domain>/ (read by deploy_scripts/deploy.sh) */
  domain: "fallfocuswcs.dance",
  /** Share image (public/images/...), 1200x627 */
  ogImage: "/images/fall_focus_2026_landscape.jpg",
  /** Home page hero */
  heroImage: "/images/fall_focus_2026_landscape.jpg",
  heroImageMobile: "/images/fall_focus_2026_ig.jpg",
  /** Footer copyright year */
  year: 2026,
  /** Google Apps Script web app that receives registrations */
  registrationScriptUrl:
    "https://script.google.com/macros/s/AKfycbxILEBS12QPrQKg7CIZl-Rh-49tosmzDq8zKpj4FfTidj-el0UpJd7GnmKr8nVpXR69/exec",
  /** Used by the (currently unused) Save the date page */
  saveTheDate: {
    flyer: "/images/flyer.png",
    facebookEventUrl: "https://www.facebook.com/events/423860077298282",
  },
};

export default eventConfig;
