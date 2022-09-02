import React, { ReactElement, useState } from 'react'
import PostTranslationsForm from './PostTranslationsForm';

const PostTranslations = ({locales,defaultLocale,post}) => {

    const languages = locales.filter((l:string) => l !== defaultLocale);
    const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

    const translationFormsDisplay: ReactElement[] = languages.map((l:string,index:number) => {
        if (l === selectedLanguage){
            return (
                <div>
                    <PostTranslationsForm 
                        post={post}
                        language={l}
                    />
                </div>
            )
        }
    })

    
  return (
    <div>
        <div>
            languages:<br/>
            <ul>
                {
                    languages.map((l:string,index:number) => (
                        <li key={Date.now() + index}>
                            <a onClick={() => setSelectedLanguage(l)}>
                                {l}
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
        {translationFormsDisplay}
    </div>
  )
}

export default PostTranslations