import React, { useEffect, useState } from "react";
import { Layout } from "./components/layout/Layout";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { Preloader } from "./components/ui/Preloader";
import { ConnectDock } from "./components/ui/ConnectDock";
import { Hero } from "./components/sections/Hero";
import { Work } from "./components/sections/Work";
import { CtaBand } from "./components/sections/CtaBand";
import { Services } from "./components/sections/Services";
import { Engagements } from "./components/sections/Engagements";
import { Process } from "./components/sections/Process";
import { Studio } from "./components/sections/Studio";
import { Faq } from "./components/sections/Faq";
import { Connect } from "./components/sections/Connect";
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
        <CtaBand />
        <Services />
        <Engagements />
        <Process />
        <Studio />
        <Faq />
        <Connect />
      </main>
      <Footer />
      <ConnectDock />
    </Layout>
  );
}
