import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert, Task } from 'react-native';
import MainHeaderBar from '@/components/headers/MainHeader';
import { StatusBar } from 'expo-status-bar';
import supabase from '@/supabase';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, TouchableOpacity } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';

const Dashboard = () => {
    const [tasks, setTasks] = useState<any[]>([]);

    const [currentTask, setCurrentTask] = useState<any>();

    const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

    const getTasks = async() => {
        const { data, error } = await supabase.from('tasks').select('*')
        .order('creation_time');

        if (error) {
            Alert.alert("An error occured")
        }

        console.log("Data: ", data);
        const newTasks = Array.from(tasks);
        newTasks.push(data);
        setTasks(() => newTasks);
        // console.log("updated tasks: ", tasks);
        // console.log("\n");
        // console.log("updator: ", newTasks);
    }
    useEffect(() => {
        getTasks();
    }, [])
  return (
    <>
        <MainHeaderBar customText='Dashboard' />
        <StatusBar style="dark" />
    <SafeAreaView style={styles.container}>
      <ScrollView style={{
        paddingTop: 100
      }}>
        <Text style={styles.contentText}>Welcome to your dashboard!
        {"\n"} Upcoming events will be visible here
        
        {"\n"}
        </Text>
        <TouchableOpacity
        onPress={() => {
          setIsCreateOpen(() => true);
        }}
        style={{
          backgroundColor: '#2563eb',
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 5,
          marginHorizontal: 30,
          marginBottom: 10
        }} 
        >
          <Text style={{
            color: "white",
            fontSize: 18,
            textAlign: 'center'
          }}>
          Create new task request
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => {
        supabase.auth.signOut().then(() => {
          router.replace("/")
        }) 
        }}
        style={{
          backgroundColor: '#dc2626',
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 5,
          marginHorizontal: 30,
          marginBottom: 40
        }} 
        >
          <Text style={{
            color: "white",
            fontSize: 18,
            textAlign: 'center'
          }}>
          Log Out
          </Text>
        </TouchableOpacity>
        {/* <Text>
            {JSON.stringify(tasks)}
        </Text> */}
        {
            tasks.map((task, index) => {
                const _task = task[0];
                console.log("TASK: ", task)
                return (
                    <TouchableOpacity key={index} 
                    onPress={() => {
                      setCurrentTask(() => _task);
                      setIsSheetOpen(() => true);
                    }} 
                    style={{
                      borderWidth: 1,
                      paddingVertical: 40,
                      paddingHorizontal: 50,
                      marginHorizontal: 20,
                      flex: 1,
                      height: 'auto',
                      marginVertical: 5,
                      justifyContent: 'center',
                      alignContent: 'center',
                      borderColor: 'rgba(0, 0, 0, 0.2)'
                    }} 
                    >
                        <Text style={{
                          fontSize: 30,
                          fontWeight: '600',
                          textAlign: 'center'
                        }}>{_task.title}</Text>
                        <Text
                        style={{
                          textAlign: 'center'
                        }} 
                        >
                          {_task.description}</Text>
                    </TouchableOpacity>
                )
            })
        }

      </ScrollView>
    </SafeAreaView>
      {
        isSheetOpen

        &&
        <TaskSub task={currentTask} dispose={() => setIsSheetOpen(() => false)} />
      }
      {
isCreateOpen

        &&
        <TaskCreate dispose={() => setIsCreateOpen(() => false)} />
      }
    </>
  );
};

interface TaskSubInterface {
  task: any,
  dispose: () => void;
}

const TaskSub: React.FC<TaskSubInterface> = ({ ...props }) => {
  return (
    <>
    <BottomSheet
            snapPoints={['40%', '40%']}
            style={{
              backgroundColor: 'white',
              shadowColor: 'black', // Shadow color
              shadowOffset: { width: 0, height: -1000 }, // Offset for top shadow
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
            }}
            enablePanDownToClose
            onClose={() => {
            props.dispose();
            }}
    >

      <BottomSheetView style={styles.contentContainer}>
        <Text
        style={{
          fontSize: 30,
          fontWeight: '700'
        }} 
        >{props.task.title}</Text>
        <Text
        style={{
          opacity: 0.5,
          fontSize: 18
        }} 
        >{props.task.description}</Text>

        <TouchableOpacity
        style={{
          backgroundColor: '#2563eb',
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 5
        }} 
        >
          <Text style={{
            color: "white",
            fontSize: 18
          }}>
          Register to Task
          </Text>
        </TouchableOpacity>

      </BottomSheetView>
    </BottomSheet>
    </>
  )
}

interface TaskCreateInterface {
  dispose: () => void;
}

const TaskCreate: React.FC<TaskCreateInterface> = ({ ...props }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  return (
    <>
    <BottomSheet
            snapPoints={['50%', '50%']}
            style={{
              backgroundColor: 'white',
              shadowColor: 'black',
              shadowOffset: { width: 0, height: -1000 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 5,
            }}
            enablePanDownToClose
            onClose={() => {
            props.dispose();
            }}
    >

      <BottomSheetView style={styles.contentContainer}>
                <TextInput clearButtonMode='while-editing' placeholder="Task Title" style= {styles.input} 
                onChangeText={setTitle}
                />
                <TextInput clearButtonMode='while-editing' placeholder="Task Description" style={styles.input} 
                onChangeText={setDescription}
                />
                <TextInput clearButtonMode='while-editing' placeholder="Task Location" style={styles.input} 
                onChangeText={setLocation}
                />
        <TouchableOpacity
        style={{
          backgroundColor: '#2563eb',
          paddingHorizontal: 30,
          paddingVertical: 10,
          borderRadius: 5
        }} 
        >
          <Text style={{
            color: "white",
            fontSize: 18
          }}>
          Create Task Request
          </Text>
        </TouchableOpacity>

      </BottomSheetView>
    </BottomSheet>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        maxHeight: 'auto'
      },
    input: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 0, 0, 0.07)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 1000,
        fontWeight: '600',
    }
});

export default Dashboard;