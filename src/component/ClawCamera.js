import { PerspectiveCamera, useKeyboardControls } from "@react-three/drei";
import {useRef} from "react";
import {useFrame} from "@react-three/fiber"
import gsap from "gsap";
import Swal from 'sweetalert2'

function ClawCamera({clawPos, setClawPos, isClawDown, setIsClawDown}){
    const camRef = useRef();
    const [, getKeys] = useKeyboardControls();

    useFrame(()=>{
        const { forward, backward, left, right, jump } = getKeys();

        const speed = 0.05;
        const limitX = 0.4;
        const limitY = 0.3;

        if(forward){
            if(clawPos.z > -limitY){
                setClawPos({x:clawPos.x, y:clawPos.y, z:clawPos.z - speed});
            }
        }
        if(backward){
            if(clawPos.z < limitY){
                setClawPos({x:clawPos.x, y:clawPos.y, z:clawPos.z + speed});
            }
        }
        if(right){
            if(clawPos.x < limitX){
                setClawPos({x:clawPos.x + speed, y:clawPos.y, z:clawPos.z});
            }
        }

        if(left){
            if(clawPos.x > -limitX){
                setClawPos({x:clawPos.x - speed, y:clawPos.y, z:clawPos.z});
            }
        }

        if(jump){
            const random = Math.random();

            if(random < 0.25){
                Swal.fire({
                    title: "獎品1",
                    text: "恭喜中獎 ! !",
                    imageUrl: "/images/gift-1.png",
                    imageWidth: 300,
                    imageHeight: 300,
                    imageAlt: "Custom image",
                    color: "#6b88b2",
                    customClass: {
                        popup: 'custom-popup1'
                    }
                  });
            }else if(random < 0.5){
                Swal.fire({
                    title: "獎品2",
                    text: "恭喜中獎 ! !",
                    imageUrl: "/images/gift-2.png",
                    imageWidth:237,
                    imageHeight: 300,
                    imageAlt: "Custom image",
                    color: "#836bb2",
                    customClass: {
                        popup: 'custom-popup2'
                    }
                  });
            }else if(random < 0.75){
                Swal.fire({
                    title: "獎品3",
                    text: "恭喜中獎 ! !",
                    imageUrl: "/images/gift-3.png",
                    imageWidth: 300,
                    imageHeight: 300,
                    imageAlt: "Custom image",
                    color: "#b26b90",
                    customClass: {
                        popup: 'custom-popup3'
                    }
                  });
            }else{
                Swal.fire({
                    title: "失敗",
                    text: "請再接再厲 ! !",
                    imageUrl: "/images/miss.png",
                    imageWidth: 300,
                    imageHeight: 300,
                    imageAlt: "Custom image",
                    color: "gray",
                    customClass: {
                        popup: 'custom-popup4'
                    }
                  });
            }

            setIsClawDown(true);
            gsap.to(clawPos, {y: -1, duration: 2, onComplete: ()=>{
                gsap.to(clawPos, {y: -0.1, duration: 1, onComplete: ()=>{
                    setIsClawDown(false);
                }})
            }})
        }

        if(camRef.current){
            camRef.current.lookAt(0, 1, 0);
        }
    });

    return(<>
        <PerspectiveCamera
            ref={camRef}
            makeDefault
            position={[0, 1, 3]} // 3 ~ 6
        />
    </>)

}

export default ClawCamera;