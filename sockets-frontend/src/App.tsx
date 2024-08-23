import { useEffect, useState } from "react"

function App() {

  const [socket, setSocket] = useState<null | WebSocket>(null); // State to hold the WebSocket instance
  const [messages, setMessages] = useState<string[]>([]); // State to hold an array of messages received from the server
  const [socketInput, setSocketInput] = useState(''); // State to manage input value for sending messages

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080'); // Create a new WebSocket connection
    newSocket.onopen = () => {
      console.log(`connection established`); // Log when the connection is established
      //newSocket.send('Hello golang !!!'); // Optionally send a message when the connection opens
      setSocket(newSocket); // Save the WebSocket instance in state
    }
    newSocket.onmessage = (message) => {
      console.log(`Message received: ${message.data}`); // Log any message received from the server
      setMessages(mess => [...mess, message.data]); // Add the received message to the messages array
    }

    return () => newSocket.close(); // Close the WebSocket connection when the component unmounts

  }, []); // Empty dependency array ensures this effect runs only once on mount

  if (!socket) {
    return <div>loading ...</div> // Display a loading message while the WebSocket connection is being established
  }

  return (
    <>
      <input type="text" value={socketInput} onChange={(e) => setSocketInput(e.target.value)} /> {/* Input field for entering messages */}
      <button onClick={() => socket.send(socketInput)}>send</button> {/* Button to send the input value to the server */}
      {messages} {/* Display the list of messages received from the server */}
    </>
  )
}

export default App
