import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import 'react-notifications/lib/notifications.css';
import { characterSymbols, lowerCaseLetters, numbers, upperCaseLetters } from './data/password';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {
  let [uppercase, setUppercase]=useState(false);
  let [lowercase, setLowercase]=useState(false);
  let [number1, setNumber1]=useState(false);
  let [symbols, setSymbols]=useState(false);
  let [passwordLen,setPasswordLen]=useState(10);
  let [fPass, setFpass]=useState('');

  let createPassword=(event)=>{
    event.preventDefault();
    let finalPass='';
    let charSet='';
    if(uppercase ||  lowercase || number1 || symbols){
      if(uppercase) charSet+=upperCaseLetters;
      if(lowercase) charSet+=lowerCaseLetters;
      if(number1) charSet+=numbers;
      if(symbols) charSet+=characterSymbols;

      for(let i=0; i<passwordLen;i++){
        finalPass+=charSet.charAt(Math.floor(Math.random()*charSet.length))
      }
      
    }else{
      NotificationManager.error("Please check the atleast one checkbox ")
    }
    setFpass(finalPass);
    // console.log(finalPass)
    // console.log(charSet);
  }
  let copyPass=()=>{
    navigator.clipboard.writeText(fPass);
    NotificationManager.success("Copy Successfully");
  }
  return (
    <div className="App">
      <NotificationContainer/>
      <div class="bg-gray-100 flex items-center justify-center h-screen">
    <div class="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 class="text-2xl font-bold mb-6 text-center">Password Generator</h1>
        <div id="password-display" class="mt-6 text-center text-gray-700 text-lg font-mono flex space-x-4 mb-2 ">
          <input className='bg-sky-400/50 w-[330px] focus:border-none	' value={fPass} readOnly type='text'></input>
          <button className='p-2 bg-red-400/50' onClick={copyPass}>Copy</button>
        </div>

        <form id="password-generator-form" class="space-y-4">
            
            <div className='flex space-x-1'>
             <input className='basis-4 ' value={passwordLen} onChange={(event)=>setPasswordLen(event.target.value)} type="number" id="length" name="length" class="mt-1 border-4 rounded-md border-gray-300 shadow-sm sm:text-sm"  min="4" max="20"/>
                <label  for="length" class=" basis-1/2 block text-sm font-medium text-gray-700">Password Length</label>
                </div>

        
            <div class="flex items-center">
                <input id="uppercase" name="uppercase" type="checkbox" checked={uppercase} onChange={()=>setUppercase(!uppercase)} class="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                <label for="uppercase" class="ml-2 block text-sm text-gray-900">Include Uppercase Letters</label>
            </div>

            
            <div class="flex items-center">
                <input id="lowercase" name="lowercase" checked={lowercase} onChange={()=>setLowercase(!lowercase)} type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                <label for="lowercase" class="ml-2 block text-sm text-gray-900">Include Lowercase Letters</label>
            </div>

           
            <div class="flex items-center">
                <input id="numbers" name="numbers" checked={number1} onChange={()=>setNumber1(!number1)} type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                <label for="numbers" class="ml-2 block text-sm text-gray-900">Include Numbers</label>
            </div>

            <div class="flex items-center">
                <input id="symbols" name="symbols" checked={symbols} onChange={()=>setSymbols(!symbols)} type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded"/>
                <label for="symbols" class="ml-2 block text-sm text-gray-900">Include Symbols</label>
            </div>

            
            <div class="mt-6">
                <button type="submit" onClick={createPassword} class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    Generate Password
                </button>
            </div>
        </form>

        
    </div>
    </div>
    </div>
  );
}

export default App;
