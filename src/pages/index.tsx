import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Layout from "../components/layout";
import {
  AxesHelper,
  DirectionalLight,
  HemisphereLight,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const IndexPage: React.FC<PageProps> = () => {
  React.useEffect(() => {
    document.title = 'Poccur.Top'
  
    const threeCanvas = document.querySelector("#three-canvas");
    if (threeCanvas) {
      const canvasWidth = threeCanvas.clientWidth;
      const canvasHeight = threeCanvas.clientHeight;

      const scene = new Scene();
      const camera = new PerspectiveCamera(
        70,
        canvasWidth / canvasHeight,
        1,
        1000
      );
      camera.position.set(0, 0, 6);
      camera.lookAt(0, 0, 0);

      const renderer = new WebGLRenderer({ antialias: true });
      renderer.setSize(canvasWidth, canvasHeight);
      renderer.setClearColor(0x000000);

      // 添加光照
      const hemiLight = new HemisphereLight(0xffffff, 0x8d8d8d, 0.7);
      hemiLight.position.set(0, 20, 0);
      scene.add(hemiLight);

      const dirLight = new DirectionalLight(0xffffff, 0.6);
      dirLight.position.set(0, 20, 10);
      dirLight.castShadow = true;
      scene.add(dirLight);

      threeCanvas.appendChild(renderer.domElement);

      // const contr = new OrbitControls(camera, renderer.domElement);

      let time = 0;

      const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);

        if (bgMaterial) {
          time += 0.01;
          bgMaterial.uniforms.iTime = {
            value: time,
          };
        }
      };

      requestAnimationFrame(render);

      // 屏幕尺寸改变画布适应
      const resize = () => {
        camera.aspect = threeCanvas.clientWidth / threeCanvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(threeCanvas.clientWidth, threeCanvas.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
      };
      window.addEventListener("resize", resize);

      // 添加一个背景板
      const bgGeometry = new PlaneGeometry(18, 8, 200, 200);
      const bgMaterial = new ShaderMaterial({
        vertexShader: `
        varying vec2 u_uv;
        void main(){
          u_uv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position , 1.0);
        }
        `,
        fragmentShader: `

        varying vec2 u_uv;
        uniform vec3 iResolution;
        uniform float iTime;

        vec4 Line(vec2 uv, float speed, float height, vec3 col) {
          uv.y += smoothstep(1., 0., abs(uv.x)) * sin(iTime * speed + uv.x * height) * .2;
          return vec4(smoothstep(.06 * smoothstep(.2, .9, abs(uv.x)), 0., abs(uv.y) - .004) * col, 1.0) * smoothstep(1., .3, abs(uv.x));
      }
        void main() 
        {         
          vec2 uv = (u_uv - .5 * iResolution.xy) / iResolution.y;
          gl_FragColor = vec4 (0.);
          for (float i = 0.; i <= 5.; i += 1.) {
              float t = i / 5.;
              gl_FragColor += Line(uv, 1. + t, 4. + t, vec3(.2 + t * .7, .2 + t * .4, 0.3));
          }
        }
        `,
      });

      bgMaterial.uniforms.iResolution = {
        value: new Vector3(1, 1, 1),
      };
      bgMaterial.uniforms.iTime = {
        value: 0,
      };

      const bg = new Mesh(bgGeometry, bgMaterial);
      scene.add(bg);
    }
  }, []);

  return (
    <Layout noFooter transparent>
      <section className=" relative h-screen w-full">
        {/**
      <img
          src={IndexBackground}
          className=" absolute w-full h-full left-0 top-0 object-cover"
        />
      */}
        <div
          id="three-canvas"
          className=" absolute w-full h-full left-0 top-0"
        ></div>
      </section>
    </Layout>
  );
};

export default IndexPage;