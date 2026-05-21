export type ManifestoDemand = {
  id: "01" | "02" | "03" | "04" | "05";
  title: string;
  demand: string;
  whatItMeans: string;
  whySupportersCare: string;
};

export const manifestoDemands: ManifestoDemand[] = [
  {
    id: "01",
    title: "No Post-Retirement Rewards",
    demand:
      "If the CJP comes in power, no Chief Justice shall be granted a Rajya Sabha seat as a post-retirement reward.",
    whatItMeans:
      "A call for clearer distance between constitutional office and political reward after retirement.",
    whySupportersCare:
      "Supporters see judicial independence as a basic democratic guardrail."
  },
  {
    id: "02",
    title: "Protect Legit Votes",
    demand:
      "If any legit vote is deleted, whether in a CJP or opposition-ruled state, the CEC shall be arrested under UAPA, as taking away voting rights of citizens is no less than terrorism.",
    whatItMeans:
      "A deliberately sharp demand that treats wrongful deletion of valid votes as an extreme democratic breach.",
    whySupportersCare:
      "Supporters care because voting rights are the entry ticket to public power."
  },
  {
    id: "03",
    title: "50% Representation",
    demand:
      "Women shall receive 50% reservation, not 33%, without increasing the strength of Parliament. Additionally, 50% of all Cabinet positions shall be reserved for women.",
    whatItMeans:
      "A demand for parity in Parliament and Cabinet representation without enlarging the legislature.",
    whySupportersCare:
      "Supporters frame equal representation as a test of whether politics reflects the public."
  },
  {
    id: "04",
    title: "Independent Media",
    demand:
      "All media houses owned by Ambani and Adani shall have their licences cancelled to make way for truly independent media. Bank accounts of Godi media anchors shall be investigated.",
    whatItMeans:
      "A satirical anti-concentration demand focused on media ownership and perceived anchor accountability.",
    whySupportersCare:
      "Supporters care about news ecosystems that are less dependent on major corporate power."
  },
  {
    id: "05",
    title: "Anti-Defection Cooling Period",
    demand:
      "Any MLA or MP who defects from one party to another shall be barred from contesting elections - and from holding any public office - for a period of 20 years.",
    whatItMeans:
      "A strict penalty proposal for elected representatives who switch parties after winning office.",
    whySupportersCare:
      "Supporters see defections as a betrayal of the voter mandate."
  }
];

export const manifestoSource = {
  label: "Read full official manifesto",
  href: "https://cockroachjantaparty.org/#manifesto"
};
