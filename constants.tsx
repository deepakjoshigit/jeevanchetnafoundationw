
import React from 'react';
import { BookOpen, Utensils, Monitor, Leaf } from 'lucide-react';
import { Initiative, DocumentInfo, TeamData } from './types';

export const FOUNDATION_NAME = "Jeevan Chetna Foundation";

export const IMAGES = {
  logo: "https://lh3.googleusercontent.com/d/1pBu42YbbpoglC0EyEDbcjDHLoYv01Jmc",
  hero: "https://lh3.googleusercontent.com/d/1SsonFiUFZR8NlUBbC0VIOAdcW60dupBm",
  heroSlider: [
    "https://lh3.googleusercontent.com/d/1uR2P8IAIJrnqJ56JMeY1YIPG9OhWjy_6",
    "https://lh3.googleusercontent.com/d/1SsonFiUFZR8NlUBbC0VIOAdcW60dupBm",
    "https://lh3.googleusercontent.com/d/1O3Ldk4RZRrVNHjOqaN_HQaoEhKbatVnW",
    "https://lh3.googleusercontent.com/d/1lciRfJ12nLvts__PdvS4X32XVdODH3r4",
    "https://lh3.googleusercontent.com/d/1pxKKGm8JPoevIHbQP9CsjnNZhG6kdZ6K",
    "https://lh3.googleusercontent.com/d/1vNLFklHIEdI02OjFwFXAhFTzfMqpWeRY"
  ],
  about: "https://lh3.googleusercontent.com/d/1VbHrjOCcVkhb8W5aA59RklhLRbCLzHnK",
  education: "https://lh3.googleusercontent.com/d/18NtFpVqwwEPXUunEGjPFP91sLzfcQBkX",
  hunger: "https://lh3.googleusercontent.com/d/1vNLFklHIEdI02OjFwFXAhFTzfMqpWeRY",
  computer: "https://lh3.googleusercontent.com/d/1O3Ldk4RZRrVNHjOqaN_HQaoEhKbatVnW",
  plantation: "https://lh3.googleusercontent.com/d/1fVRsfpgkxW1pvh14CaIDxPxGUGXJiouj",
  placeholder: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
  qrCode: "https://lh3.googleusercontent.com/d/1GfQpVsxqXQmkQhBEs1mjKkKHw7nf5U__",
  gallery: [
    "https://lh3.googleusercontent.com/d/1VbHrjOCcVkhb8W5aA59RklhLRbCLzHnK",
    "https://lh3.googleusercontent.com/d/1xqzBdjysDvhXmzQsT-xeQKqSC-JJMAIM",
    "https://lh3.googleusercontent.com/d/1OKcSHJUfRvTq7cxMi5IixUXPGBV14PqP",
    "https://lh3.googleusercontent.com/d/1OFT3HPaB6Piv_gN0L02Dti-O2UcyPqH9",
    "https://lh3.googleusercontent.com/d/18V532pvJJxXuIc8MB_BNvVvrOcctMULY",
    "https://lh3.googleusercontent.com/d/1vNLFklHIEdI02OjFwFXAhFTzfMqpWeRY",
    "https://lh3.googleusercontent.com/d/1ynK5L_nF16K1RkgEGye7tvM3dQJW_Z98",
    "https://lh3.googleusercontent.com/d/1beo1Z9h4NLgXow0MlLXXgyVQuznlgy_V",
    "https://lh3.googleusercontent.com/d/1ehNoqbtrR3623Nt46l6_hUbUz0DRoo7h",
    "https://lh3.googleusercontent.com/d/1sKbWHRjORm01jzKINhZtP0howtKv_EHe",
    "https://lh3.googleusercontent.com/d/1oIWhs2paSI7Yf_r4pZn-4-cfyutBHxYm",
    "https://lh3.googleusercontent.com/d/1Ylqa913t0DeaWx-d37_FMHAjy4ieRjqM",
    "https://lh3.googleusercontent.com/d/1JKZOg3v_kdaQFH7REGTnXgrxrDmIcTSO",
    "https://lh3.googleusercontent.com/d/1rJ-ePgzoPyaQPVxGeRt-YWY4RVjf4VMA",
    "https://lh3.googleusercontent.com/d/1LlxWy766MV32Ls8rry9GMKggQWJI6ZdK",
    "https://lh3.googleusercontent.com/d/1tBqwD85oZuUbuhIdENeQnc68y-olLTwS",
    "https://lh3.googleusercontent.com/d/1TaBeFHlfCgaj3KHdMj45wEQrgDkcNY_7"
  ]
};

export const TEAM_MEMBERS: TeamData = {
  founders: [
    {
      name: "Deepak Joshi",
      role: "Founder & Director",
      description: "A visionary leader dedicated to social transformation, Deepak spearheads our digital literacy and community development initiatives in Uttarakhand.",
      emoji: "👨‍💼",
      color: "bg-orange-100",
      image: "https://lh3.googleusercontent.com/d/1GhkIUqbQVTBY-i6pfTTdcfzDBiOHMvMJ"
    },
    {
      name: "Pravin Kumar Pandey",
      role: "Founder & Director",
      description: "With deep roots in social service, Pravin leads our hunger relief and grassroots empowerment programs, ensuring no one in our community is left behind.",
      emoji: "👨‍💻",
      color: "bg-blue-100",
      image: "https://lh3.googleusercontent.com/d/1-djoBnZqkFTW8wFeHY189SuC6uQk70hT"
    }
  ],
  coreTeam: [
    { name: "Kamal Bhatt", role: "Educational Lead", description: "Passionate about child welfare and primary education outreach.", emoji: "👨‍🏫", image: "https://lh3.googleusercontent.com/d/1URocIZiEK9LoLxcd2QWLXvVWWusMpqBX" },
    { name: "Kamal Tiwari", role: "Environmental Head", description: "Driving our plantation drives and local ecological preservation efforts.", emoji: "🌱", image: "https://lh3.googleusercontent.com/d/1t9rSOLortv1NRDTsvUTUM2OFgeURUYc_" },
    { name: "Dipesh Joshi", role: "Digital Coordinator", description: "Expert in computer education and bridging the digital divide for youth.", emoji: "💻", image: "https://lh3.googleusercontent.com/d/1abHC3l8FNQxklY_qyET91cGxSPe6H5wJ" },
    { name: "Abhay Joshi", role: "Operations Manager", description: "Ensuring seamless logistics for our daily food distribution programs.", emoji: "📦", image: "https://lh3.googleusercontent.com/d/1phPF9qshuKag-SvW-a-gUkq8UL_pOXr1" },
    { name: "Pankaj Kandpal", role: "Community Support", description: "Dedicated to local community engagement and social welfare activities.", emoji: "🤝", image: "https://lh3.googleusercontent.com/d/1I75PTwnCdTExYazKH0yGSPQU17dA9t7U" },
    { name: "Suresh Joshi", role: "Strategic Advisor", description: "Managing financial compliance and organizational strategy for growth.", emoji: "📈" },
    { name: "Manish Pandey", role: "Volunteer Liaison", description: "The bridge between our foundation and the dedicated hands that help us.", emoji: "🤝" },
    { name: "Jyoti", role: "Women Empowerment", description: "Leading initiatives that focus on skill-building and independence for women.", emoji: "👩‍🎓" },
    { name: "Manisha", role: "Health & Welfare", description: "Advocating for community health and social safety nets for the vulnerable.", emoji: "👩‍⚕️" }
  ]
};

export const CONTACT_INFO = {
  headOffice: "Divya Ratan Colony, Gas Godam Road, Haldwani, Nainital. Pin code - 263139",
  workingAddress: "Ramari Choti, Gadhi Aashram road, Haldwani, Nainital",
  phones: ["+91 9012146420", "+91 8958521254"],
  whatsapp: "+91 90685 28721",
  emails: ["jeevanchetnafoundationn@gmail.com", "info@jeevanchetnafoundation.org"],
  socials: {
    facebook: "https://www.facebook.com/jeevanchetnafoundation",
    instagram: "https://www.instagram.com/jeevanchetnafoundation/",
    twitter: "https://x.com/ijeevanchetna",
    whatsapp: "https://api.whatsapp.com/send/?phone=919068528721&text&type=phone_number&app_absent=0"
  }
};

export const BANK_DETAILS = {
  accountName: "Jeevan Chetna Foundation",
  accountNo: "00000044208565753",
  bankName: "SBI (State Bank of India)",
  ifsc: "SBIN0000646",
};

export const RAZORPAY_KEY = "rzp_live_Rn2dFscVisbwzC";

export const INITIATIVES: Initiative[] = [
  {
    title: "Education Sector",
    description: "Providing quality education to underprivileged children to build a brighter future.",
    image: IMAGES.education,
    icon: <BookOpen className="w-8 h-8 text-orange-500" />,
  },
  {
    title: "Hunger Relief",
    description: "Dedicated to ending hunger by distributing nutritious meals to those in need daily.",
    image: IMAGES.hunger,
    icon: <Utensils className="w-8 h-8 text-red-500" />,
  },
  {
    title: "Computer Education",
    description: "Bridging the digital divide by teaching essential computer skills to youth.",
    image: IMAGES.computer,
    icon: <Monitor className="w-8 h-8 text-blue-500" />,
  },
  {
    title: "Plantation Drives",
    description: "Protecting our environment through large-scale tree planting and awareness.",
    image: IMAGES.plantation,
    icon: <Leaf className="w-8 h-8 text-green-500" />,
  },
];

export const DOCUMENTS: DocumentInfo[] = [
  { category: "Registration", label: "MCA Certificate", value: "U85500UT2025NPL019366" },
  { category: "Taxation", label: "PAN Card", value: "AAGCJ9244C (9/6/2025)" },
  { category: "Taxation", label: "TAN No", value: "MRTJO5239D" },
  { category: "Compliance", label: "NGO Darpan ID", value: "UK/20250681855" },
  { category: "Exemptions", label: "12A Registration", value: "AAGCJ9244CE2025101" },
  { category: "Exemptions", label: "80G Registration", value: "AAGCJ9244CF2025101" },
  { category: "Social Responsibility", label: "CSR Certificate No", value: "CSR00096141" },
  { category: "MSME", label: "Udham Reg/MSME", value: "UK-07-0038439" },
  { category: "Startup", label: "DPIIT Startup India", value: "DIPP215092" },
  { category: "Legal", label: "Licence No", value: "069568" },
];

export const DIRECTORS = [
  { 
    name: "Pravin Kumar Pandey", 
    din: "11145062",
    image: "https://lh3.googleusercontent.com/d/1-djoBnZqkFTW8wFeHY189SuC6uQk70hT"
  },
  { 
    name: "Deepak Joshi", 
    din: "11145061",
    image: "https://lh3.googleusercontent.com/d/1GhkIUqbQVTBY-i6pfTTdcfzDBiOHMvMJ"
  }
];
