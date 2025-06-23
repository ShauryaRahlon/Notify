
"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { Contest } from "@/model/Contest";
import {Reminder} from "@/model/Reminder";
import { ApiResponse } from "@/types/ApiResponse";

import { useSession } from "next-auth/react";



const ContestContext = createContext<any>(null);
const ContestProvider = ({ children }: { children: ReactNode }) => {
   const { data: session, status } = useSession();
  const [contest, setContest] = useState<Contest[]>([]);
  const [reminder, setReminder] = useState<Reminder[]>([]);
  const [contestLoading, setContestLoading] = useState<boolean>(true);
  const [reminderLoading, setReminderLoading] = useState<boolean>(true);
  const getContest = async () => {
    if( contest.length > 0) return; // Avoid refetching if contests are already loaded
    try {
      setContestLoading(true);
      const response = await axios.get<ApiResponse>("/api/get-contests");
      // If message is a JSON string, parse it; otherwise, assume it's already an array
      const contests = typeof response.data.message === "string"
        ? JSON.parse(response.data.message)
        : response.data.message;
      setContest(contests as Contest[]);
    } catch (error) {
      console.error("Error fetching contests:", error);
      throw error;
    }
    finally {
      setContestLoading(false);
    } 
  }
  const getReminder = async () => {
    if( reminder.length > 0) return; // Avoid refetching if reminders are already loaded
    try {
      setReminderLoading(true);
      const response = await axios.get<ApiResponse>("/api/get-reminders");
      const reminders = typeof response.data.message === "string"
        ? JSON.parse(response.data.message)
        : response.data.message;
      setReminder(reminders as Reminder[]);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      throw error;
    } finally {
      setReminderLoading(false);
    }
  }
 

  useEffect(() => { 
   if (status === "authenticated") {
    getContest();
    getReminder();
    } else return;
  }, [status]);
  


  return (
    <ContestContext.Provider value={{ contest,reminder, contestLoading, reminderLoading, getContest, getReminder }}>
      {children}
    </ContestContext.Provider>
  );
};

export { ContestContext, ContestProvider };


