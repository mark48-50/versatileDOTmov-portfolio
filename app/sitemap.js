export default function sitemap() {
  return [
    {
      url: 'https://versatiledotmovportfolio.vercel.app',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    // If you ever add separate pages like /projects or /contact in the future, 
    // you would just add them right here!
  ];
}