const newsletter = {
  route: `/newsletter`,
  slug: {
    route: (slug: string) => `/newsletter/${slug}`,
  },
};

const paths = {
  home: {
    route: `/`,
  },
  newsletter: newsletter,
};

export default paths;
