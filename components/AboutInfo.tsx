import React, { ReactElement } from 'react'
import { useDispatch, useSelector } from 'store/hooks';
import Gallery from './Gallery';

const AboutInfo = () => {

  const { gallery } = useSelector((state) => state.aboutinfo)
  const { aboutInfo } = useSelector((state) => state.aboutinfo)

  let aboutInfoDisplay : ReactElement;
  if (aboutInfo !== null){
    aboutInfoDisplay = (
      <div>
        <div dangerouslySetInnerHTML={{__html:aboutInfo.text_top}}></div>
        <Gallery 
          gallery={gallery}
        />
        <div dangerouslySetInnerHTML={{__html:aboutInfo.text_bottom}}></div>
      </div>
    )
  }

  return (
    <div id="about-info">
        <h1>Über Uns</h1>
        {aboutInfoDisplay}
    </div>
  )
}

export default AboutInfo