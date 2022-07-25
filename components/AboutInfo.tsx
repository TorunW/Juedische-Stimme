import React from 'react'

const AboutInfo = ({aboutInfo}) => {
  return (
    <div id="about-info">
        <h1>Über Uns</h1>
        <div dangerouslySetInnerHTML={{__html:aboutInfo.text_top}}></div>
        <div>
            GALLERY - {aboutInfo.about_gallery_id}
        </div>
        <div dangerouslySetInnerHTML={{__html:aboutInfo.text_bottom}}></div>
    </div>
  )
}

export default AboutInfo