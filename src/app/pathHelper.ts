const newsletter = {
  route: `/newsletter`,
  friendlyName: 'Newsletter',
  slug: {
    route: (slug: string) => `/newsletter/${slug}`,
  },
};

const tools = {
  route: `/tools`,
  friendlyName: 'Tools',
  healthTermGlossary: {
    route: '/tools/health-term-glossary',
    friendlyName: 'Health Term Glossary',
  },
  heartRateZones: {
    route: '/tools/heart-rate-zones',
    friendlyName: 'Heart Rate Zones',
  },
};

const blog = {
  route: `/blog`,
  friendlyName: 'Blog',
  slug: {
    route: (slug: string) => `/blog/${slug}`,
  },
  category: {
    route: (slug: string) => `/blog/category/${slug}`,
  },
};

const author = {
  route: `/author`,
  friendlyName: 'Authors',
  slug: {
    route: (slug: string) => `/author/${slug}`,
  },
};

const paths = {
  home: {
    route: `/`,
    friendlyName: 'Home',
  },
  newsletter,
  tools,
  blog,
  author,
};

export default paths;
