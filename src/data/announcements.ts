export interface Announcement {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  content: string;
  isOfficial?: boolean;
}

export const announcements: Announcement[] = [
  {
    id: "executive-membership-2026",
    title: "Official Announcement of Executive Membership",
    date: "1st May 2026",
    category: "Official",
    isOfficial: true,
    summary: "The Mepe Development Association formally announces the composition of its newly constituted Executive Committee.",
    content: `
      MEPE DEVELOPMENT ASSOCIATION
      OFFICIAL PUBLIC ANNOUNCEMENT

      Subject: Announcement of Executive Membership

      The Mepe Development Association is pleased to formally announce the composition of its newly constituted Executive Committee. This team has been entrusted with the responsibility of steering the affairs of the Association and advancing its mission of development and unity within the Mepe community.

      The Executive Members are as follows:

      Chairman: Bismark Fiifi Tetteh
      1st Vice Chairman (Finance and Administration): Michael Fosu
      2nd Vice Chairman: To be announced
      Chief of Staff: Sammy Atani
      General Secretary: Haygood Newman Gbedzeker
      Deputy General Secretary: Eyra Arnong
      Financial Secretary: Anna Enyonam Awuku
      Treasurer: Dziedzorm Christiana Kwadzoti
      Organizer: Afako Dzidonu
      Deputy Organizer: Barnabas Ladzaglah
      Public Relations Officer (PUBLICITY, INFORMATION AND EDUCATION TEAM MANAGER): Francis Ladzagla
      Marketing/Protocols Manager: Awusi Evelyn Fosu
      Women’s Organizers: Comfort Akorfa Akpese, Elizabeth Dziedzorm Bokor

      This Executive Committee reflects a diverse and committed leadership dedicated to promoting sustainable development initiatives, fostering community engagement, and enhancing the welfare of all members of the Mepe community.

      The Association calls on all members, stakeholders, and well-wishers to extend their full support and cooperation to the Executive Committee as they undertake this important mandate.

      Further updates regarding the appointment of the 2nd Vice Chairman will be communicated in due course.

      Issued by:
      Mepe Development Association
      Date: 1st May 2026
    `
  },
  // {
  //   id: "scholarship-2026",
  //   title: "2026 Scholarship Applications Open",
  //   date: "10th June 2026",
  //   category: "Youth",
  //   summary: "Applications are now open for the 2026 academic year scholarships for Mepe students.",
  //   content: "Details regarding the 2026 scholarship program will be posted here soon. Stay tuned for eligibility criteria and application deadlines."
  // }
];
