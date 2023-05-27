import PhotoContainer from "./components/PhotoContainer"
import PhotoPreview from "./components/PhotoPreview"
import Searchbar from "./components/Searchbar"
import { useAppContext } from "./context/context"

function App() {
  const { show_photo_preview }= useAppContext();
  return (
    <div className={`${show_photo_preview && 'h-screen overflow-hidden'}`}>
      <Searchbar/>
      <PhotoContainer/>
      <PhotoPreview/>
    </div>
  )
}

export default App
