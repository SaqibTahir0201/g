import "./ThreeD_UFO.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap"; // Import GSAP for animations
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const ThreeD_UFO = () => {
  useGSAP(() => {
    let bee;
    let mixer;

    let arrPositionModel = [
      {
        id: "banner",
        position: { x: 0, y: -1, z: 0 },
        rotation: { x: 0, y: -7.7, z: 0 },
      },
      {
        id: "intro",
        position: { x: -1.5, y: 0.6, z: -10 },
        rotation: { x: 0.3, y: -13, z: 0 },
      },
      {
        id: "intro2",
        position: { x: 1.5, y: 1, z: -10 },
        rotation: { x: 0.5, y: -15, z: 0 },
      },
      {
        id: "intro3",
        position: { x: -1.5, y: 1, z: -10 },
        rotation: { x: 0.3, y: -10, z: 0 },
      },
      {
        id: "intro4",
        position: { x: 1.5, y: 1, z: -10 },
        rotation: { x: 0.5, y: -7, z: 0 },
      },
      {
        id: "intro5",
        position: { x: -1.5, y: 1, z: -10 },
        rotation: { x: 0.3, y: -10, z: 0 },
      },
      {
        id: "intro6",
        position: { x: 1.5, y: 1, z: -10 },
        rotation: { x: 0.5, y: -8.3, z: 0 },
      },
      {
        id: "intro7",
        position: { x: -1.5, y: 1, z: -10 },
        rotation: { x: 0.3, y: -10, z: 0 },
      },
      {
        id: "intro8",
        position: { x: 1.5, y: 1, z: -10 },
        rotation: { x: 0.5, y: -8.3, z: 0 },
      },
      {
        id: "intro9",
        position: { x: -1.5, y: 1, z: -10 },
        rotation: { x: 0.3, y: -10, z: 0 },
      },
      {
        id: "intro10",
        position: { x: 1.5, y: 1, z: -10 },
        rotation: { x: 0.5, y: -8.3, z: 0 },
      },
      {
        id: "contact",
        position: { x: 1, y: 1, z: -10 },
        rotation: { x: 0.5, y: -10, z: 0 },
      },
    ];
    const camera = new THREE.PerspectiveCamera(
      5,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z =
      window.innerWidth < 510 ? 150 : window.innerWidth < 768 ? 100 : 50;

    const scene = new THREE.Scene();
    const loader = new GLTFLoader();

    // Function to handle model movement based on scroll position
    const modelMove = () => {
      if (!bee) return; // Ensure 'bee' is defined before proceeding

      const sections = document.querySelectorAll(".section");
      let currentSection;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
          currentSection = section.id;
        }
      });

      const position_active = arrPositionModel.findIndex(
        (val) => val.id === currentSection
      );

      if (position_active >= 0) {
        const new_coordinates = arrPositionModel[position_active];

        gsap.to(bee.position, {
          x: new_coordinates.position.x,
          y: new_coordinates.position.y,
          z: new_coordinates.position.z,
          duration: 0.5,
          ease: "power1.out",
        });

        gsap.to(bee.rotation, {
          x: new_coordinates.rotation.x,
          y: new_coordinates.rotation.y,
          z: new_coordinates.rotation.z,
          duration: 1,
          ease: "power1.out",
        });

        // Change background color and text color based on the current section with GSAP
        let backgroundColor, textColor;

        switch (currentSection) {
          case "banner":
            backgroundColor = "#2B0A34"; // Deep Purple (starting point)
            textColor = "#fff"; // White (works well with dark purple)
            break;
          case "intro":
            backgroundColor = "#1E3D58"; // Deep Blue
            textColor = "#fff"; // White (good contrast on dark blue)
            break;
          case "intro2":
            backgroundColor = "#3D1A44"; // Light Purple
            textColor = "#fff"; // White (works well with deep purple)
            break;
          case "intro3":
            backgroundColor = "#1f0560"; // Light Navy Blue
            textColor = "#fff"; // White (great contrast with navy)
            break;
          case "intro4":
            backgroundColor = "#511C4E"; // Pink Purple
            textColor = "#fff"; // White (balances with pinkish purple)
            break;
          case "intro5":
            backgroundColor = "#3A4E76"; // Slate Blue
            textColor = "#fff"; // White (sharp contrast)
            break;
          case "intro6":
            backgroundColor = "#671D58"; // Light Purple
            textColor = "#fff"; // White (great contrast on purple)
            break;
          case "intro7":
            backgroundColor = "#1F4B74"; // Deep Sea Blue
            textColor = "#fff"; // White (clear readability on dark blue)
            break;
          case "intro8":
            backgroundColor = "#8C1D6D"; // Lavender Purple
            textColor = "#fff"; // White (balances with lavender)
            break;
          case "intro9":
            backgroundColor = "#3D638D"; // Blue Steel
            textColor = "#fff"; // White (contrasts well with blue steel)
            break;
          case "intro10":
            backgroundColor = "#2A5D84"; // Ocean Blue
            textColor = "#fff"; // White (sharp contrast on ocean blue)
            break;
          case "contact":
            backgroundColor = "#070A29"; // Deep Blue-Grey
            textColor = "#fff"; // White (good contrast with dark tones)
            break;
          default:
            backgroundColor = "#fff"; // Default white
            textColor = "#000"; // Default black for readability
        }

        // Use GSAP to animate the background and text color changes
        gsap.to(document.body, {
          backgroundColor: backgroundColor,
          duration: 0.5,
          ease: "power1.out",
        });

        gsap.to(document.body, {
          color: textColor,
          duration: 0.5,
          ease: "power1.out",
        });
      }
    };

    // Load the 3D model

    loader.load(
      "/cake.glb", // Correct path to the model
      (gltf) => {
        bee = gltf.scene; // Assign the loaded model to 'bee'
        scene.add(bee);
        // console.log(gltf);

        mixer = new THREE.AnimationMixer(bee);
        if (gltf.animations.length > 0) {
          // mixer.clipAction(gltf.animations[0]).play();
        }

        // Call modelMove after the model is loaded
        modelMove();
      },
      (xhr) => {
        // console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        console.error("Error loading model", error);
      }
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Make sure the container3D div exists before appending the renderer
    const container = document.getElementById("container3D");
    if (container) {
      container.appendChild(renderer.domElement);
    } else {
      console.error("The container3D element does not exist.");
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    // Rendering loop
    const reRender3D = () => {
      requestAnimationFrame(reRender3D);
      renderer.render(scene, camera);
      if (mixer) mixer.update(0.02);
    };
    reRender3D();

    // Scroll event listener to update model position
    window.addEventListener("scroll", () => {
      if (bee) {
        modelMove(); // Only call modelMove if 'bee' is loaded
      }
    });

    // Resize event listener for responsive rendering
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Ensure GSAP and ScrollTrigger are registered
    gsap.registerPlugin(ScrollTrigger);

    // Banner section animations (no ScrollTrigger)
    const bannerImg1 = document.querySelectorAll("#banner .img1");
    const bannerImg2 = document.querySelectorAll("#banner .img2");

    if (bannerImg1.length) {
      gsap.set(bannerImg1, { x: 100, opacity: 0 });
      gsap.to(bannerImg1, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        delay: 1,
        ease: "linear",
      });
    }

    if (bannerImg2.length) {
      gsap.set(bannerImg2, { x: -100, opacity: 0 });
      gsap.to(bannerImg2, {
        x: 0,
        opacity: 1,
        duration: 0.3,
        delay: 1,
        ease: "linear",
      });
    }

    // ScrollTrigger animations for all other sections
    const sections = document.querySelectorAll(".section:not(#banner)");

    sections.forEach((section) => {
      // Right side images
      const rightImages = section.querySelectorAll(".decorate:nth-child(even)");
      rightImages.forEach((img) => {
        gsap.set(img, { x: 100, opacity: 0 });
        gsap.to(img, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 10%",
            scrub: 20,
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Left side images
      const leftImages = section.querySelectorAll(".decorate:nth-child(odd)");
      leftImages.forEach((img) => {
        gsap.set(img, { x: -100, opacity: 0 });
        gsap.to(img, {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 10%",
            scrub: 10,
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Top images
      const topImages = section.querySelectorAll(".decorate[style*='top']");
      topImages.forEach((img) => {
        gsap.set(img, { y: -100, opacity: 0 });
        gsap.to(img, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        });
      });

      // Bottom images
      const bottomImages = section.querySelectorAll(
        ".decorate[style*='bottom']"
      );
      bottomImages.forEach((img) => {
        gsap.set(img, { y: 100, opacity: 0 });
        gsap.to(img, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "top 10%",
            scrub: 1,
            toggleActions: "play reverse play reverse",
          },
        });
      });
    });

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("scroll", modelMove);
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return (
    <div className="threed-body overflow-hidden">
      {/* <header className="w-full">
        <div className="content-fit">
          <img src="img/logo.png" alt="" className="w-20" />
          <nav>
            <ul>
              <li>About</li>
              <li>Portfolio</li>
              <li>Services</li>
              <li>Book Writing</li>
            </ul>
          </nav>
        </div>
      </header> */}

      <div className="section" id="banner">
        <div className="content-fit overflow-hidden">
          <div className="title">Happy Birthday Shahzeen</div>
        </div>

        <img
          src="g/4.png"
          className="img1 decorate -z-10 bottom-[-25px] max-sm:bottom-52"
          alt=""
          style={{ width: "30vw", right: 0 }}
        />
        <img
          src="g/2.png"
          className="img2 decorate rotate-left bottom-[-25px] max-sm:bottom-40"
          alt=""
          style={{ width: "15vw", left: 70 }}
        />
      </div>

      <div className="section left overflow-hidden" id="intro">
        <div className="content-fit">
          <div className="number">01</div>
          <div className="des">
            <div className="title">The Many Names of My Heart</div>
            <p>
              Every time I call you by one of the sweet names I’ve given
              you—Shazy, Shany, Shen, Panda, or Muhterma—it's a reminder of how
              special and unique you are to me. Each name is a little piece of
              the immense love I have for you, a love that grows deeper every
              day. No matter what I call you, you’ll always be the one who holds
              my heart.
            </p>
          </div>
        </div>
        <img
          src="g/1.png"
          className="decorate -z-50 bottom-[-18px] max-sm:bottom-0"
          alt=""
          style={{ width: "30vw", left: -50 }}
        />

        <img
          src="g/3.png"
          className="decorate -z-50"
          alt=""
          style={{ width: "18vw", top: 20, right: 80 }}
        />

        <img
          src="g/4.png"
          className="decorate -z-10 bottom-[-70px] max-sm:bottom-0"
          alt=""
          style={{ width: "35vw", right: -50 }}
        />
      </div>

      <div className="section right left overflow-hidden" id="intro2">
        <div className="content-fit">
          <div className="number">02</div>
          <div className="des">
            <div className="title">Forever in My Thoughts</div>
            <p>
              Even though we might be miles apart, my thoughts are always with
              you. On your special day, and every day, my heart beats for you. I
              can’t wait to hold you close, celebrate with you, and make up for
              the time we’ve spent apart. Until then, you are always in my
              prayers and thoughts, shining brightly in my life.
            </p>
          </div>
        </div>
        <img
          src="g/5.png"
          className="decorate -z-50"
          alt=""
          style={{ width: "45vw", bottom: 0, right: -50 }}
        />
        <img
          src="g/6.png"
          className="decorate -z-5 top-[-100px] max-sm:top-[-30px]"
          alt=""
          style={{ width: "60vw", left: "-20%" }}
        />
        <img
          src="g/7.png"
          className="decorate -z-10 top-[-70px] max-sm:top-[-50px]"
          alt=""
          style={{ width: "35vw", right: -50 }}
        />
      </div>

      <div className="section left overflow-hidden" id="intro3">
        <div className="content-fit">
          <div className="number">03</div>
          <div className="des">
            <div className="title">The Light of My Life</div>
            <p>
              You’re the one who brightens my world, Shahzeen. Much like the
              stars you resemble, you bring warmth, beauty, and magic into my
              life. Every time I look at you, I see a future full of love,
              laughter, and endless possibilities. You truly light up my life,
              and I want to orbit around you forever.
            </p>
          </div>
        </div>
        <img
          src="g/8.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "50vw", bottom: 0, right: "-10%" }}
        />

        <img
          src="g/9.png"
          className="decorate -z-50 -top-[35%]"
          alt=""
          style={{ width: "70vw", right: "-27%" }}
        />
      </div>

      <div className="section right left overflow-hidden" id="intro4">
        <div className="content-fit">
          <div className="number">04</div>
          <div className="des">
            <div className="title">A Love Beyond Words</div>
            <p>
              Words often fall short when it comes to expressing how I feel
              about you, my love. But every moment we share, every glance, every
              touch speaks volumes. You’re not just my partner; you’re my best
              friend, my confidante, my everything. I feel so incredibly blessed
              to have you by my side.
            </p>
          </div>
        </div>
        <img
          src="g/10.png"
          className="decorate -z-50"
          alt=""
          style={{ width: "30vw", bottom: 0, right: 50 }}
        />

        <img
          src="g/11.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "15vw", top: 70, right: -50 }}
        />
        <img
          src="g/12.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "10vw", top: 0, left: 0 }}
        />
      </div>

      <div className="section left overflow-hidden" id="intro5">
        <div className="content-fit">
          <div className="number">05</div>
          <div className="des">
            <div className="title">Building a Home Together</div>
            <p>
              Home isn’t just a place—it’s wherever you are. When I think of my
              future, I picture a life filled with laughter, love, and warmth,
              with you by my side. Whether we're making decisions about what to
              watch on Netflix or building a life together, every moment spent
              with you is a piece of paradise.
            </p>
          </div>
        </div>
        <img
          src="g/13.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "35vw", top: 70, left: 50 }}
        />
        <img
          src="g/14.png"
          className="decorate -z-10 top-[-40px] max-sm:top-[0px]"
          alt=""
          style={{ width: "30vw", right: -50 }}
        />
        <img
          src="g/15.png"
          className="decorate -z-20 "
          alt=""
          style={{ width: "30vw", top: 70, left: 80 }}
        />
        <img
          src="g/16.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "30vw", bottom: 0, right: -50 }}
        />
      </div>

      <div className="section right left overflow-hidden" id="intro6">
        <div className="content-fit">
          <div className="number">06</div>
          <div className="des">
            <div className="title">A Future Filled with Dreams</div>
            <p>
              Shahzeen, you’re not just the love of my life; you’re the dream I
              never even knew I had. I can’t wait to make those dreams a reality
              with you—building a future together, sharing milestones, and
              growing old together. With you, I feel like the luckiest person
              alive.
            </p>
          </div>
        </div>
        <img
          src="g/17.png"
          className="decorate -z-50"
          alt=""
          style={{ width: "10vw", bottom: 80, left: "40%" }}
        />

        <img
          src="g/18.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "20vw", top: 0, left: -50 }}
        />

        <img
          src="g/19.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "10vw", bottom: "30%", right: "10%" }}
        />
        <img
          src="g19.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "10vw", bottom: 0, left: -70 }}
        />

        <img
          src="g/2.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "10vw", top: "30%", right: 20 }}
        />
        <img
          src="g/3.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "20vw", top: "50%", left: -80 }}
        />
      </div>

      <div className="section left left overflow-hidden" id="intro7">
        <div className="content-fit">
          <div className="number">07</div>
          <div className="des">
            <div className="title">The Proposal of a Lifetime</div>
            <p>
              You already know that I’ve been imagining this moment for so long,
              and while you may have asked the first question, my heart has
              always known the answer: "Yes, forever." You are the one I want to
              spend my life with, and I can’t wait to say those vows to you,
              over and over again, for the rest of my life.
            </p>
          </div>
        </div>
        <img
          src="g/4.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "17vw", top: "10%", left: "30%" }}
        />

        <img
          src="g/5.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "8vw", top: "5%", right: "5%" }}
        />
        <img
          src="g/6.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "12vw", bottom: "5%", right: "7%" }}
        />
        <img
          src="g/7.png"
          className="decorate -z-10"
          alt=""
          style={{ width: "15vw", top: "40%", left: "-6%" }}
        />

        <img
          src="g/8.png"
          className="decorate"
          alt=""
          style={{ width: "10vw", top: "65%", left: "15%" }}
        />

        <img
          src="g/9.png"
          className="decorate"
          alt=""
          style={{ width: "5vw", bottom: "0%", left: "25%" }}
        />

        <img
          src="g/11.png"
          className="decorate"
          alt=""
          style={{ width: "8vw", bottom: "0%", left: "45%" }}
        />
      </div>

      <div className="section right left overflow-hidden" id="intro8">
        <div className="content-fit">
          <div className="number">08</div>
          <div className="des">
            <div className="title">Building a Family with You</div>
            <p>
              One of the greatest joys I look forward to is sharing our love
              with the next generation. I can already picture you as the most
              amazing mother, and the thought of raising little Pandas with you
              fills me with so much excitement. Together, we’ll create a world
              filled with love, joy, and endless memories.
            </p>
          </div>
        </div>
        <img
          src="g/12.png"
          className="decorate"
          alt=""
          style={{ width: "20vw", top: "0%", left: "-7%" }}
        />
        <img
          src="g/13.png"
          className="decorate rotate-[270deg]"
          alt=""
          style={{ width: "20vw", bottom: "8%", right: "-5%" }}
        />
        <img
          src="g/14.png"
          className="decorate"
          alt=""
          style={{ width: "12vw", bottom: "0%", left: "10%" }}
        />
      </div>

      <div className="section left overflow-hidden" id="intro9">
        <div className="content-fit">
          <div className="number">09</div>
          <div className="des">
            <div className="title">A Love That Keeps Growing</div>
            <p>
              Every day, I find more reasons to love you. Whether it’s your
              kindness, your humor, or the way your eyes light up when you
              smile, there is always something new that makes my heart swell
              with admiration. You are the best thing that ever happened to me,
              and I’ll keep loving you more every single day.
            </p>
          </div>
        </div>
        <img
          src="g/16.png"
          className="decorate"
          alt=""
          style={{ width: "15vw", bottom: "0%", left: "10%" }}
        />
        <img
          src="g/17.png"
          className="decorate"
          alt=""
          style={{ width: "10vw", top: "0%", right: "10%" }}
        />
        <img
          src="g/18.png"
          className="decorate"
          alt=""
          style={{ width: "6vw", bottom: "5%", right: "2%" }}
        />
        <img
          src="g/19.png"
          className="decorate"
          alt=""
          style={{ width: "6vw", bottom: "35%", right: "10%" }}
        />
        <img
          src="g/1.png"
          className="decorate rotate-[-45deg]"
          alt=""
          style={{ width: "6vw", bottom: "0%", right: "25%" }}
        />
      </div>

      <div className="section right left overflow-hidden" id="intro10">
        <div className="content-fit">
          <div className="number">10</div>
          <div className="des">
            <div className="title">The Promise of Forever</div>
            <p>
              From the moment I met you, I knew that I was going to spend my
              life with you. You’ve already stolen my heart, and now I can’t
              wait to make you my forever. We’ve already begun our journey, and
              I promise to cherish you, support you, and love you for all the
              years to come.
            </p>
          </div>
        </div>
        <img
          src="g/1.png"
          className="decorate"
          alt=""
          style={{ width: "15vw", bottom: "0%", right: "5%" }}
        />
        <img
          src="g/2.png"
          className="decorate"
          alt=""
          style={{ width: "10vw", top: "10%", left: "5%" }}
        />
        <img
          src="g/3.png"
          className="decorate"
          alt=""
          style={{ width: "6vw", bottom: "5%", right: "2%" }}
        />
        <img
          src="g/4.png"
          className="decorate"
          alt=""
          style={{ width: "6vw", bottom: "35%", right: "10%" }}
        />
        <img
          src="g/5.png"
          className="decorate"
          alt=""
          style={{ width: "6vw", bottom: "10%", left: "5%" }}
        />
      </div>

      <div className="section" id="contact">
        <div className="content-fit">
          <div className="number">Shahzeen</div>
          <div className="des">
            <div className="title">Happy Birthday, My Love</div>
            <p>
              On this special day, I want to remind you how incredibly blessed I
              am to have you in my life. You are my heart, my joy, and my
              everything. Every moment spent with you is a gift, and I cherish
              you more than words can say. Your love has transformed my world,
              and I can’t wait to spend forever with you, creating more
              beautiful memories. As you celebrate today, know that I will be
              right here, by your side, loving you more with each passing day.
              Happy Birthday to the love of my life—may this year bring you all
              the happiness you deserve and more.
            </p>
          </div>
        </div>
        <img
          src="g/6.png"
          className="decorate"
          alt=""
          style={{ width: "10vw", bottom: 25, right: 45, opacity: 1 }}
        />
        <img
          src="g/7.png"
          className="decorate"
          alt=""
          style={{ width: "10vw", bottom: 85, left: 45, opacity: 1 }}
        />
        <img
          src="g/8.png"
          className="decorate"
          alt=""
          style={{ width: "15vw", top: 25, left: 45, opacity: 1 }}
        />
      </div>

      {/* Container for the 3D model */}
      <div id="container3D" style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
};

export default ThreeD_UFO;

/* 

*/
