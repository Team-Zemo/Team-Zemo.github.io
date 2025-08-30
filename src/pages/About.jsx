import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import logo from "../assets/logoTeamZemo.png";

function About() {
  return (
    <div>
      <Parallax
        pages={2}
        style={{ height: "100vh", backgroundColor: "#c0dffc" }}
      >
        <ParallaxLayer offset={0} speed={0.8} className="z-10">
          <h1 className="text-8xl font-bold mt-80 justify-center text-center">
            Meet the Maniacs
          </h1>
          <p className="text-8xl font-bold mt-5 justify-center text-center">
            We are a hood full of creative minds.
          </p>
          <h1 className="text-[15rem] font-bold mt-10 justify-center text-center">
            Team Zemo
          </h1>
        </ParallaxLayer>
        <ParallaxLayer offset={0.9} speed={0.5} className="z-20">
          <img src={logo} alt="Team Zemo" />
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
export default About;
