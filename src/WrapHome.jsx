import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Home from "./Home";
import Navbar from "./Navbar";
import Services from "./Services";
import Eabout from "./Eabout";
import { useInView } from "react-intersection-observer";

const WrapHome = () => {
  const { ref: ref1, inView: iv1 } = useInView({
    threshold: 0,
    rootMargin: "-200px",
  });
  const { ref: ref2, inView: iv2 } = useInView({
    threshold: 0,
    rootMargin: "-200px",
  });
  const { ref: ref3, inView: iv3 } = useInView({
    threshold: 0,
    rootMargin: "-200px",
  });
  const { ref: ref4, inView: iv4 } = useInView({
    threshold: 0,
    rootMargin: "-200px",
  });
  const { ref: ref5, inView: iv5 } = useInView({
    threshold: 0,
    rootMargin: "-200px",
  });
  return (
    <>
      <Home ref1={ref1} />
      <Navbar iv1={iv1} iv2={iv2} iv3={iv3} iv4={iv4} iv5={iv5} />
      <Eabout ref2={ref2} />
      <About ref3={ref3} />
      <Services ref4={ref4} />
      <Contact ref5={ref5} />
      <Footer />
    </>
  );
};

export default WrapHome;
