import React from 'react'

const NewsletterForm = () => {
    const MAILCHIMP_URL = process.env.MAILCHIMP_URL;
    console.log(MAILCHIMP_URL, " MAILCHIMP URL")
    return (
        <div>
            <h1>Sign up to Newsletter</h1>
        </div>
    )
}

export default NewsletterForm