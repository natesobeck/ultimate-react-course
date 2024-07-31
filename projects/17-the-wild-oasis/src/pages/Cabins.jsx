import { useEffect } from "react"
import Heading from "../ui/Heading"
import Row from "../ui/Row"
import { getCabins } from "../services/apiCabins"

function Cabins() {
  useEffect(function () {
    async function fetchCabins() {
      const data = await getCabins()
      console.log(data)
    }
    fetchCabins()
  }, [])

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img
        src="https://fjlavxnjbyacrgnujnsc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
        alt="cabin"
      />
    </Row>
  )
}

export default Cabins
