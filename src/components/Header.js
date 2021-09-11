import React, { useContext, useEffect, useRef, useState } from 'react'
import { SidebarContext } from '../context/SidebarContext'
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
  ChatIcon,
} from '../icons'
import { Modal, Avatar, ModalBody, ModalHeader, ModalFooter, Input, Label, Button, Dropdown, DropdownItem, WindmillContext } from '@windmill/react-ui'
import { useAuth } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'
import { data } from 'autoprefixer'
import moment from 'moment'


function Header() {
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  const { user, logOut } = useAuth();
  const history = useHistory()
  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-blue-600 dark:text-blue-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-blue"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-blue-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for projects"
              aria-label="Search"
            />
          </div> */}
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <Button onClick={() => history.push('/app/packages')}>
              <div>Invest Now</div>
            </Button>
            <ChatBox />
          </li>
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-blue"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}

          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-blue focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={user ? (user.photoURL) ? user.photoURL : 'https://ui-avatars.com/api/?name=' + user.email : ""}
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="/app/settings">
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Settings</span>
              </DropdownItem>
              <DropdownItem onClick={() => logOut()}>
                <OutlineLogoutIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Log out</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header


function ChatBox() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  const { user } = useAuth()
  const [chat, load, error] = useCollection(firebase.firestore().collection(`uData/${user.uid}/notifications`).orderBy('created'), {})


  const [me, setMe] = useState(null)

  const scrollToBottom = () => {
    if (me != null) {
      me.scrollIntoView({ behavior: "smooth" });
    }
  }
  useEffect(() => {
    scrollToBottom()
  }, [me])

  const [loading, setLoading] = useState(false)
  const sendMessage = async () => {
    setLoading(true)
    if (message != null) {
      await firebase.firestore().collection(`uData/${user.uid}/notifications`).add({ title: message, description: message, created: Date.now(), uid: user.uid })
      scrollToBottom()
    }
    setMessage("")
    setLoading(false)
  }

  const [message, setMessage] = useState(null)
  return <>
    <Button className="mx-1" onClick={() => openModal()}>
      <div className="hidden md:block">Live Chat</div>
      <div className="md:hidden"><ChatIcon className="w-5 h-5" aria-hidden="true" /></div>
    </Button>
    <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='shadow text-white w-min rounded-t-lg  px-2 py-4 bg-blue-700'>
          <h2>Chat with Optimo Team</h2>
        </div>
        <div className="bg-gray-100 w-full overflow-y-scroll" style={{ height: '65vh' }}>
          <div className="flex flex-col px-2 mt-2 space-y-3 pb-3 ">
            {chat && chat.docs.map((doc) => {
              return <>
                {(doc.data().uid == user.uid) ? <div className="w-max ml-auto break-all mt-2 mb-1 p-2 rounded-lg rounded-br-none bg-blue-500 rounded-2xl text-white text-left mx-3">
                  <p>{doc.data().title}</p>
                  <p className="float-right">
                    <small>
                      <sub>
                        {moment(new Date(doc.data().created)).format("DD-MM ")} {moment(new Date(doc.data().created)).format("h:mm a ")}
                      </sub>
                    </small>
                  </p>
                </div> : <div class=" text-black other break-all mt-2  mx-3 rounded-lg rounded-bl-none float-none bg-gray-300 mr-auto rounded-2xl p-2">
                  <p>{doc.data().title}</p>
                  <p className="float-left">
                    <small>
                      <sub>
                        {moment(new Date(doc.data().created)).format("DD-MM ")} {moment(new Date(doc.data().created)).format("h:mm a ")}
                      </sub>
                    </small>
                  </p>
                </div>}
              </>
            })}
            <div style={{ float: "left", clear: "both" }}
              ref={(el) => setMe(el)}>
            </div>
          </div>
        </div>
        <div class="flex flex-row">
          <input value={message} disabled={loading} type="text" placeholder="Enter your message" defaultValue={message} onChange={(e) => setMessage(e.target.value)} class=" flex-1 p-2 text-md rounded-bl-lg outline-none bg-gray-50 focus:bg-white" />
          <button type="button" class="bg-blue-700 p-2 rounded-br" onClick={() => sendMessage()} disabled={loading}>
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
    </Modal>
  </>
}