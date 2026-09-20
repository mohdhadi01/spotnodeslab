import React, { useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Preloader } from "./components/ui/Preloader";
import { Hero } from "./components/sections/Hero";
import { Work } from "./components/sections/Work";
import { Services } from "./components/sections/Services";
import { Process } from "./components/sections/Process";
import { Studio } from "./components/sections/Studio";
import { Contact } from "./components/sections/Contact";
import data from "./data/site.json";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.title = data.seo.title;
  }, []);

  return (
    <Layout>
      <Preloader onDone={() => setReady(true)} />
      <Header />
      <main>
        <Hero ready={ready} />
        <Work />
        <Services />
        <Process />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </Layout>
  );
}
