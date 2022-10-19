import { useEffect, useState } from "react";
import * as THREE from 'three'
import { Box3, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { Flow } from 'three/addons/modifiers/CurveModifier.js';

const TextModel = (props) => {
    const {text, points, font, fontSize, moveCurve, textCoverInfo, onClickTextCover, sectionId} = props;

    const [object, setObject] = useState()
    const [objectCover, setObjectCover] = useState()

    function cpBox(obj){
        const box = new Box3()
        const positions = obj.geometry.getAttribute('position').array
        for (let i = 0; i < positions.length; i+=3) {
          box.expandByPoint(new Vector3(positions[i], positions[i+1], positions[i+2]))
        }
        return box
    }

    useEffect(() => {
        const curve = new THREE.CatmullRomCurve3(points);
        curve.curveType = 'centripetal';
        curve.closed = true;
    
        const geometry1 = new TextGeometry( text, {
          font: font,
          size: fontSize,
          height: 1,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.01,
          bevelOffset: 0,
          bevelSegments: 5,
        } );
    
        geometry1.rotateX( Math.PI );
        geometry1.rotateY( Math.PI );
    
        const material = new THREE.MeshStandardMaterial( {
          color: 0xC177FF
        } );
    
        const objectToCurve = new THREE.Mesh( geometry1, material );
    
        const flow = new Flow( objectToCurve );
        flow.updateCurve( 0, curve );
        flow.moveAlongCurve( moveCurve );
        flow.object3D.userData = {text: '3D models', isText: true}
    
        const obj = flow.object3D
        // setObject(obj)
    
        if(textCoverInfo){
            const box = cpBox(obj)
            const coverGeometry = new BoxGeometry(box.max.x - box.min.x, box.max.y - box.min.y, box.max.z - box.min.z)
            const mesh = new Mesh(coverGeometry, new MeshBasicMaterial({color: 0x00ff00}))
            mesh.position.set(textCoverInfo.position.x, textCoverInfo.position.y, textCoverInfo.position.z)
            mesh.rotation.set(textCoverInfo.rotation.x, textCoverInfo.rotation.y, textCoverInfo.rotation.z)
            mesh.userData = {type: 'TextCover', text: text, sectionId}
            mesh.visible = false
            setObjectCover(mesh)
        }
    }, [])

    return (
        <>
            {object && <primitive object={object}/>}
            {objectCover && <primitive object={objectCover} onClick={(e) => {
                // if(e.object.userData?.text){
                onClickTextCover(e)
                // }
            }}/>}
        </>
    )
}
export default TextModel;