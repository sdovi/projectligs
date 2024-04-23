import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useParams } from 'react-router-dom';
import Test  from './test'

export default function Ligainfolist() {

  return (
    <div className='ligainfo__sect'>
    <Test/>

    </div>
  );
}
