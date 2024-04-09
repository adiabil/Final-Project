import React, { useReducer, useContext, useEffect } from "react";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";

import { useParams } from "react-router-dom";
import { InlineWidget, useCalendlyEventListener } from 'react-calendly';
import './AppointMent.css'
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

// Define action types
const ActionTypes = {
    FETCH_THERAPIST_REQUEST: 'FETCH_THERAPIST_REQUEST',
    FETCH_THERAPIST_SUCCESS: 'FETCH_THERAPIST_SUCCESS',
    FETCH_THERAPIST_FAILURE: 'FETCH_THERAPIST_FAILURE'
};

// Define reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_THERAPIST_REQUEST:
            return { ...state, loading: true, error: null };
        case ActionTypes.FETCH_THERAPIST_SUCCESS:
          console.log(action)
            return { ...state, loading: false, therapistData: action.payload };
        case ActionTypes.FETCH_THERAPIST_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const AppointMent = () => {
    const { user } = useContext(AuthContext);
    const baseUrl = process.env.REACT_APP_BASE_URL
    console.log(user._id);
    const [state, dispatch] = useReducer(reducer, {
        loading: false,
        error: null,
        therapistData: null
    });
    let { username } = useParams();

    useCalendlyEventListener({

        onEventScheduled: async (e) => {  try {
            const res = await axios.put(`${baseUrl}/auth/client/${username}`, { id: user._id });

            } catch (error) {

            }},
    });

    useEffect(() => {
        const fetchTherapist = async () => {
            dispatch({ type: ActionTypes.FETCH_THERAPIST_REQUEST });

            try {
                const res = await axios.get(`${baseUrl}/auth/therapist/${username}`);
                dispatch({ type: ActionTypes.FETCH_THERAPIST_SUCCESS, payload: res.data });
            } catch (error) {
                dispatch({ type: ActionTypes.FETCH_THERAPIST_FAILURE, payload: error.message });
            }
        };

        fetchTherapist();

        return () => {
        };
    }, [baseUrl, username]);


    return (
        <div>
            <Navbar current={"search"} />

            <div className="calendly-container">
                <h3 style={{ textAlign: 'center' }}>Schedule Appointment with {username}</h3>

                {state.loading && <p style={{textAlign:'center', marginTop:20}}>Loading...</p>}
                {state.error && <p style={{textAlign:'center', marginTop:20}}>Error: {state.error}</p>}
                {state.therapistData && (
            <div>
              {/* {state.the} */}
                        {/* Render therapist data here */}
                        <InlineWidget prefill={{name: user.username, email:user.email}} url={`https://calendly.com/${state.therapistData[0].calendlyUser}`} />
                    </div>
                )}
            </div>


        </div>
    );
};

export default AppointMent;
