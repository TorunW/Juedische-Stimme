import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import FacebookPost from 'components/facebook/FacebookPost'

describe('Test for FacebookPost.tsx',() => {

    const fbPost = `{"id":"998665673528998_365066482466396","likes":{"data":[{"id":"125676064171411","name":"Roter Aufbau Hamburg"}],"paging":{"cursors":{"before":"QVFIUkVQS0VtNTRVMDdRaURkSlpSdWNseHBkbXh4RnRlSmdKWFdQak9mZAWpBTkx0Sk5NTkRPMEt5Y3Nxb1ZArY0FEdmhFQWh0TE5iUHozSEpGSkY0OXhBZATBB","after":"QVFIUnpkVEoxVzRqdTJYeTlOVEJ3V1RENno3MkRqanhoM290UWhWclA2Q3c1S2QxNUw5REI2dmN6UEhCNXV3d01DR3AZD"}}},"reactions":{"data":[{"id":"125676064171411","name":"Roter Aufbau Hamburg","type":"LIKE"}],"paging":{"cursors":{"before":"QVFIUkVQS0VtNTRVMDdRaURkSlpSdWNseHBkbXh4RnRlSmdKWFdQak9mZAWpBTkx0Sk5NTkRPMEt5Y3Nxb1ZArY0FEdmhFQWh0TE5iUHozSEpGSkY0OXhBZATBB","after":"QVFIUnpkVEoxVzRqdTJYeTlOVEJ3V1RENno3MkRqanhoM290UWhWclA2Q3c1S2QxNUw5REI2dmN6UEhCNXV3d01DR3AZD"}}},"comments":{"data":[{"created_time":"2022-08-10T09:24:28+0000","message":"Liebe Frau Bernstein, ich habe Ihnen eine PN geschickt. Beste Grüße","id":"365066482466396_1086506518910315"}]},"shares":{"count":2},"attachments":{"data":[{"description":"Mit Shir Hever sprechen wir darüber, was Sicherheit im israelischen Kontext bedeutet, wie die Polizei und andere Sicherheitsinstitutionen in Israel die Besat...","media":{"image":{"height":720,"src":"https://external-ber1-1.xx.fbcdn.net/emg1/v/t13/13448839428597002760?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCjRnnPeWZAY%2Fmaxresdefault_live.jpg&fb_obo=1&utld=ytimg.com&stp=c0.5000x0.5000f_dst-emg0_p720x720_q75&_nc_eui2=AeFb5e77M_BEia5GX8pcN_ARMd6bPtIjhyQx3ps-0iOHJF3ZAJimNo3BAzI1kPf_mEM&ccb=13-1&oh=00_AT9uiXWohIwMQrQkMaYXVFiLgHkDqBr1ocj05ccnWILeMQ&oe=62F964F2&_nc_sid=c504da","width":720},"source":"https://www.youtube.com/embed/CjRnnPeWZAY?autoplay=1"},"target":{"url":"https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCjRnnPeWZAY&h=AT0ahyCmHJPX9ZVRmRFsmPNQ_ZT_ePSLPspIzi8Yd11MinXIbSY_DQKbcAwdFO1KsxnDoNARXOGfZJR6vPElIivGrKz1X5h3XrgVO2xM2KXBkw6jlhWSK86NgLInhdFxsddGJijm-eVEmeJGpipYKw&s=1"},"title":"Israels Sicherheitsindustrie mit Shir Hever - 99 ZU EINS - Ep. 164","type":"share","url":"https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCjRnnPeWZAY&h=AT0ahyCmHJPX9ZVRmRFsmPNQ_ZT_ePSLPspIzi8Yd11MinXIbSY_DQKbcAwdFO1KsxnDoNARXOGfZJR6vPElIivGrKz1X5h3XrgVO2xM2KXBkw6jlhWSK86NgLInhdFxsddGJijm-eVEmeJGpipYKw&s=1"}]},"full_picture":"https://external-ber1-1.xx.fbcdn.net/emg1/v/t13/13448839428597002760?url=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCjRnnPeWZAY%2Fmaxresdefault_live.jpg&fb_obo=1&utld=ytimg.com&stp=dst-emg0_q75_s1280x720&_nc_eui2=AeFb5e77M_BEia5GX8pcN_ARMd6bPtIjhyQx3ps-0iOHJF3ZAJimNo3BAzI1kPf_mEM&ccb=13-1&oh=00_AT9WhrjO4EDu8yyqHqlzdBFzP1eFr_ZxLvRGo0MnbjVg1Q&oe=62F964F2&_nc_sid=c504da","message":"Unser Mitglied, Dr. Shir Hever:","from":{"name":"Jüdische Stimme für gerechten Frieden in Nahost","id":"998665673528998"},"permalink_url":"https://www.facebook.com/354526120187099/posts/365066482466396","created_time":"2022-08-09T16:27:29+0000"} `

    afterEach(() => {   
        cleanup();
    })

    test('should render facebook post container & from',() => {
        render(<FacebookPost post={JSON.parse(fbPost)}/>);
        const fbPostContainer = screen.getByTestId('container');
        expect(fbPostContainer).toBeInTheDocument();
        const fbPostFrom = screen.getByTestId('from');
        expect(fbPostFrom).toHaveTextContent("Jüdische Stimme für gerechten Frieden in Nahost");
    })
    
    test('should render facebook post attachment', () => {
        render(<FacebookPost post={JSON.parse(fbPost)}/>);
        const fbPostAttachment = screen.getByTestId('attachment-0')
        expect(fbPostAttachment).toBeInTheDocument()
        const fbPostAttachmentTitle = screen.getByTestId('attachment-0-title')
        expect(fbPostAttachmentTitle).toHaveTextContent('Israels Sicherheitsindustrie')
    })

    test('matches snapshot', () => {
        const tree = renderer.create(<FacebookPost post={JSON.parse(fbPost)}/>).toJSON()
        expect(tree).toMatchSnapshot();
    })
    
    // test('should render facebook post reactions svgs', () => {
    //     render(<FacebookPost post={JSON.parse(fbPost)}/>);
    //     const fbPostReactions = screen.getByTestId('reactions');
    //     // expect(fbPostReactions).toContainHTML('<svg>') better move the entire svg to a seperate file?
    // })
})
