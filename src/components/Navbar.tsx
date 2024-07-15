import React from 'react'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { TiMicrophone } from "react-icons/ti";
import { BsYoutube, BsCameraVideo, BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoAppsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { changeSearchTerm, clearSearchTerm, clearVideos } from '../store';
import { getSearchPageVideos } from '../store/reducers/getSearchPageVideos';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtubeApp.searchTerm);
  const handleSearch = () => {
    if (location.pathname !== "/search") { navigate("/search") }
    else {
      dispatch(clearVideos())
      dispatch(getSearchPageVideos(false))
    }
  }

  

  return (
    <div className="flex justify-between items-center px-14 h-14 bg-[#212121] opacity-95 sticky top-0 z-50">
      <div className="flex gap-8 items-center text-2xl">
        <div>
          <GiHamburgerMenu />
        </div>
        <Link to="/">
          <div className="flex gap-1 item-center justify-center ">
            <BsYoutube className="text-3xl text-red-600" />
            <span className="text-xl font-medium">Youtube</span>
          </div>
        </Link>
      </div>
      <div className="flex item-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex bg-zinc-900 items-center h-10 px-4 pr-0">
            <div className="flex gap-4 items-center pr-5">
              <div>
                <AiOutlineSearch className="text-xl" />
              </div>
              <input
                type="text"
                className="w-96 bg-zinc-900 focus:outline-none border-none"
                value={searchTerm}
                onChange={(e) => {
                  dispatch(changeSearchTerm(e.target.value));
                }}
              />

              <AiOutlineClose
                className={`text-xl cursor-pointer ${!searchTerm ? "invisible" : "visible"}`}
                onClick={()=>dispatch(clearSearchTerm())}
              />
            </div>
            <button className="h-10 w-16 flex items-center justify-center bg-zinc-800">
              <AiOutlineSearch className="text-xl" />
            </button>
          </div>
        </form>

        <div className="text-xl p-3 bg-zinc-900 rounded-full">
          <TiMicrophone />
        </div>
      </div>
      <div className="flex gap-5 items-center text-xl ">
        <BsCameraVideo />
        <IoAppsSharp />
        <div className="relative">
          <BsBell />
          <span className="absolute bottom-2 left-2 text-xs bg-red-600 rounded-full px-1">
            9+
          </span>
        </div>
        <img
          src="https://yt3.ggpht.com/wgnEbc2Ec2JYkeyzUbiHzDlAFObI2Btwo2YRCEF1aCMBiRc5E_zWy8-URBQS3EMQ1yzzaGFR=s88-c-k-c0x00ffffff-no-rj-mo"
          className="w-9 h-9 rounded-full"
          alt="logo"
        />
      </div>
    </div>
  );
}


/*

question: dispatch(addItemAction); but above we writed dispatch(clearVideos()); but clearVideos is a reducer,not an action so there is a conflict right now


answer:
I see where the confusion lies. Let's clarify the roles of reducers and actions in Redux and how they relate to dispatch.

Reducers and Actions in Redux
Reducers:

Reducers are functions responsible for updating the state in response to actions.
They specify how the application's state changes based on the type of action and the associated payload.
Actions:

Actions are plain JavaScript objects that describe events or intentions to change the state.
They have a mandatory type field that defines the type of action being performed.
Optionally, they can include a payload field containing data necessary for the state update.
Dispatching Actions
Dispatch: The dispatch function is provided by Redux (or Redux Toolkit) to send actions to the store. When you call dispatch(action), Redux handles the action and passes it to the reducers.
Understanding clearVideos
In your original setup:

javascript
Kodu kopyala
import { clearVideos } from './yourSliceFile';

dispatch(clearVideos());
clearVideos here is actually an action creator, not a reducer. It's automatically generated by Redux Toolkit's createSlice when you define a reducer function named clearVideos inside createSlice.

Action Creator: Redux Toolkit generates action creators for each reducer function defined in createSlice. These action creators create and return action objects when called.

Calling dispatch(clearVideos()):

This dispatches an action object { type: 'youtubeApp/clearVideos' }.
Internally, Redux Toolkit manages the connection between the action creator (clearVideos) and the corresponding reducer (clearVideos function you defined).
Why It Works
Redux Toolkit abstracts away the complexity of direct action object creation by providing these generated action creators (clearVideos, changeSearchTerm, etc.).
When you call dispatch(clearVideos()), you're actually dispatching an action object with the correct type ('youtubeApp/clearVideos') that Redux understands and processes through the corresponding reducer function (clearVideos).
Conclusion
In Redux and Redux Toolkit:

Actions are objects that describe events or intentions to change the state.
Reducers are functions that specify how the state should change in response to actions.
Action creators (clearVideos, changeSearchTerm, etc.) are functions that generate these action objects for you to dispatch.
Therefore, dispatch(clearVideos()) is correct and appropriate. It dispatches an action object generated by the clearVideos action creator, which Redux Toolkit understands and processes through the clearVideos reducer function to update the state accordingly.

*/