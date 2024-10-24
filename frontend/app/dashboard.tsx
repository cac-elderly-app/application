import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import MainHeaderBar from '@/components/headers/MainHeader';
import { StatusBar } from 'expo-status-bar';
import supabase from '@/supabase';

const Dashboard = () => {
    const [tasks, setTasks] = useState<any[]>([]);

    const getTasks = async() => {
        const { data, error } = await supabase.from('tasks').select('*')
        .order('creation_time');

        if (error) {
            Alert.alert("An error occured")
        }

        console.log("Data: ", data);
        tasks.push(data);
    }
    useEffect(() => {
        getTasks();
    }, [])
  return (
    <>
        <MainHeaderBar customText='Dashboard' />
        <StatusBar style="dark" />
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.contentText}>Welcome to your dashboard!
        {"\n"} Upcoming events will be visible here
        
        {"\n"}
        </Text>
        <Text>
            {JSON.stringify(tasks)}
        </Text>
        {
            tasks.map((task, index) => {
                console.log("TASK: ", task)
                return (
                    <View>
                        <Text>{task!.title}</Text>
                    </View>
                )
            })
        }

      </View>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ea',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20
  },
});

export default Dashboard;