import React from "react";
import Sample1 from '../assets/test1.jpg';
import Sample2 from '../assets/test2.jpg';
import Sample3 from '../assets/test3.jpg';
import Sample4 from '../assets/test4.jpg';

export default function ImgInfoComponent() {
    return(
        <>
        <div className="img-comp" id="img-info">
            <div className="img-box-title">
                <h5 className="img-title">#Algunas Imágenes evaluadas</h5>
            </div>
            <div className="example-img">
                <img className="img-sample" src={Sample1} alt="microplastic image binary sample 1" />
                <img className="img-sample" src={Sample2} alt="microplastic image binary sample 2" />
            </div>
            <div className="example-img one-line">
                <img className="img-sample" src={Sample3} alt="microplastic image binary sample 3" />
                <img className="img-sample" src={Sample4} alt="microplastic image binary sample 4" />
            </div>
        </div>
        </>
    )
}