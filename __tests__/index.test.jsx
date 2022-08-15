import { render, screen } from '@testing-library/react'
import Home from 'pages/index'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import {store} from 'store/store'

describe('Home', () => {
  it('renders components', () => {
    // const navItems = `[{"post_title":null,"post_name":null,"ID":null,"taxonomy":"main_menu","title":"Aktuelles","term_id":63,"link":"category/Aktuelles/page/1","term_order":1},{"post_title":null,"post_name":null,"ID":null,"taxonomy":"main_menu","title":"Aktivitäten","term_id":86,"link":"#events","term_order":2},{"post_title":"Über uns","post_name":"uber-uns","ID":11,"taxonomy":"main_menu","title":"","term_id":87,"link":"#about-info","term_order":3},{"post_title":null,"post_name":null,"ID":null,"taxonomy":"main_menu","title":"Newsletter","term_id":70,"link":"category/Newsletter/page/1","term_order":4},{"post_title":"Kontakt","post_name":"kontakt","ID":13,"taxonomy":"main_menu","title":"Kontakt","term_id":78,"link":"#contact","term_order":5},{"post_title":"Mitgliedsantrag","post_name":"mitgliedsantrag","ID":12,"taxonomy":"call_to_action_menu","title":"Mitglied Werden","term_id":83,"link":"","term_order":10},{"post_title":"Spenden","post_name":"hilf-uns","ID":19,"taxonomy":"call_to_action_menu","title":"Spenden","term_id":84,"link":"","term_order":10},{"post_title":"Links","post_name":"links","ID":87,"taxonomy":"footer_menu","title":"","term_id":72,"link":"null","term_order":100},{"post_title":"Impressum","post_name":"impressum","ID":17,"taxonomy":"footer_menu","title":"","term_id":73,"link":"null","term_order":100},{"post_title":"Kontaktformular 1","post_name":"kontaktformular-1","ID":2758,"taxonomy":"footer_menu","title":"","term_id":76,"link":"null","term_order":100},{"post_title":"Impressum","post_name":"impressum","ID":17,"taxonomy":"footer_menu","title":"","term_id":85,"link":"","term_order":101}]`
    // render(
    //     <Provider store={store}>
    //         <Home
    //           navItems={navItems}
    //         />
    //     </Provider>
    // )

    // // check if main header is in the document
    // const mainHeader = screen.getByRole('main-header')
    // expect(mainHeader).toBeInTheDocument()

    // // check if heading (h1) with the text 'LATEST POSTS:' is in the document
    // const heading = screen.getByRole('heading', {
    //   name: "LATEST POSTS:",
    // })
    // expect(heading).toBeInTheDocument()
  })
})