import { Toaster } from "react-hot-toast"
import Background from "../about/Background"
import ContactForm from "./ContactForm"

const page = () => {  

  return (
  <>
    <Toaster />
    <Background />
    <ContactForm />
  </>
  )
}

export default page