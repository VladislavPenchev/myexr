import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ExerciseLogModal from "../components/ExerciseLogModal";

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  type: string;
}

// Helper function to get date string
const getDateString = (daysOffset: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
};

// Mock data - упражнения по дни
const exercisesByDate: { [key: string]: Exercise[] } = {
  [getDateString(-2)]: [
    {
      id: "1",
      name: "Squats",
      sets: 3,
      reps: 12,
      type: "Legs",
    },
    {
      id: "2",
      name: "Deadlifts",
      sets: 4,
      reps: 8,
      type: "Back",
    },
    {
      id: "3",
      name: "Bench Press",
      sets: 3,
      reps: 10,
      type: "Chest",
    },
    {
      id: "4",
      name: "Squats",
      sets: 3,
      reps: 12,
      type: "Legs",
    },
    {
      id: "5",
      name: "Deadlifts",
      sets: 4,
      reps: 8,
      type: "Back",
    },
    {
      id: "6",
      name: "Bench Press",
      sets: 3,
      reps: 10,
      type: "Chest",
    },
  ],
  [getDateString(-1)]: [
    {
      id: "4",
      name: "Pull Ups",
      sets: 3,
      reps: 10,
      type: "Back",
    },
    {
      id: "5",
      name: "Bicep Curls",
      sets: 3,
      reps: 12,
      type: "Arms",
    },
  ],
  [getDateString(0)]: [
    {
      id: "6",
      name: "Running",
      sets: 1,
      reps: 30,
      type: "Cardio",
    },
    {
      id: "7",
      name: "Push Ups",
      sets: 3,
      reps: 15,
      type: "Chest",
    },
  ],
  [getDateString(1)]: [
    {
      id: "8",
      name: "Planks",
      sets: 3,
      reps: 60,
      type: "Core",
    },
    {
      id: "9",
      name: "Crunches",
      sets: 3,
      reps: 20,
      type: "Core",
    },
  ],
};

export default function JournalScreen() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const calendarHeight = height * 0.4;
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(today);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);

  const selectedExercises = exercisesByDate[selectedDate] || [];

  const markedDates: { [key: string]: any } = {
    [selectedDate]: {
      selected: true,
      selectedColor: "#007AFF",
      selectedTextColor: "#fff",
    },
  };

  // Маркираме дните, които имат упражнения
  Object.keys(exercisesByDate).forEach((date) => {
    if (!markedDates[date]) {
      markedDates[date] = {
        marked: true,
        dotColor: "#4A90E2",
      };
    }
  });

  const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
      Legs: "#FF6B00",
      Back: "#4A90E2",
      Chest: "#F44336",
      Arms: "#FFD700",
      Cardio: "#4CAF50",
      Core: "#9C27B0",
    };
    return colors[type] || "#999";
  };

  const formatMonthYear = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
      {/* Calendar Section - Fixed at 50% */}
      <View
        style={[
          styles.calendarContainer,
          { height: calendarHeight, paddingTop: insets.top + 10 },
        ]}
      >
        <Calendar
          current={currentMonth}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={markedDates}
          onMonthChange={(month: any) => {
            setCurrentMonth(month.dateString);
          }}
          customHeader={(props: any) => {
            const handlePreviousMonth = () => {
              const current = new Date(props.current);
              const year = current.getFullYear();
              const month = current.getMonth();
              const prevMonth = month === 0 ? 11 : month - 1;
              const prevYear = month === 0 ? year - 1 : year;
              const monthString = `${prevYear}-${String(prevMonth + 1).padStart(
                2,
                "0"
              )}-01`;
              setCurrentMonth(monthString);
            };

            const handleNextMonth = () => {
              const current = new Date(props.current);
              const year = current.getFullYear();
              const month = current.getMonth();
              // Create date for next month, using day 15 to avoid timezone issues
              const nextMonth = month === 11 ? 0 : month + 1;
              const nextYear = month === 11 ? year + 1 : year;
              const newDate = new Date(nextYear, nextMonth, 15);
              const monthString = `${nextYear}-${String(nextMonth + 1).padStart(
                2,
                "0"
              )}-01`;
              setCurrentMonth(monthString);
            };

            return (
              <View style={styles.customHeader}>
                <TouchableOpacity
                  onPress={handlePreviousMonth}
                  style={styles.headerArrow}
                >
                  <Ionicons name="chevron-back" size={20} color="#999" />
                </TouchableOpacity>
                <Text style={styles.headerDateText}>
                  {formatMonthYear(props.current)}
                </Text>
                <TouchableOpacity
                  onPress={handleNextMonth}
                  style={styles.headerArrow}
                >
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              </View>
            );
          }}
          theme={{
            backgroundColor: "#000",
            calendarBackground: "#000",
            textSectionTitleColor: "#999",
            selectedDayBackgroundColor: "#007AFF",
            selectedDayTextColor: "#fff",
            todayTextColor: "#007AFF",
            dayTextColor: "#fff",
            textDisabledColor: "#444",
            dotColor: "#4A90E2",
            selectedDotColor: "#fff",
            arrowColor: "#999",
            monthTextColor: "#999",
            indicatorColor: "#007AFF",
            textDayFontWeight: "500",
            textMonthFontWeight: "normal",
            textDayHeaderFontWeight: "500",
            textDayFontSize: 14,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 12,
          }}
          style={styles.calendar}
          hideArrows={true}
          renderHeader={() => null}
        />
        {/* Custom Day Names Header */}
        <View style={styles.dayNamesHeader}>
          {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, index) => (
            <Text key={index} style={styles.dayNameText}>
              {day}
            </Text>
          ))}
        </View>
      </View>

      {/* Exercises List Section - Scrollable */}
      <View style={styles.exercisesContainer}>
        <Text style={styles.sectionTitle}>
          {selectedExercises.length > 0
            ? `Exercises for ${new Date(selectedDate).toLocaleDateString(
                "en-US",
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                }
              )}`
            : "No exercises scheduled for this day"}
        </Text>
        <ScrollView
          style={styles.exercisesList}
          showsVerticalScrollIndicator={false}
        >
          {selectedExercises.length > 0 ? (
            selectedExercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={styles.exerciseCard}
                activeOpacity={0.7}
                onPress={() => {
                  setSelectedExercise(exercise);
                  setIsLogModalVisible(true);
                }}
              >
                <View style={styles.exerciseHeader}>
                  <View
                    style={[
                      styles.typeBadge,
                      { backgroundColor: `${getTypeColor(exercise.type)}20` },
                    ]}
                  >
                    <View
                      style={[
                        styles.typeDot,
                        { backgroundColor: getTypeColor(exercise.type) },
                      ]}
                    />
                    <Text
                      style={[
                        styles.typeText,
                        { color: getTypeColor(exercise.type) },
                      ]}
                    >
                      {exercise.type}
                    </Text>
                  </View>
                </View>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.exerciseDetails}>
                  <View style={styles.detailItem}>
                    <Ionicons name="repeat-outline" size={16} color="#999" />
                    <Text style={styles.detailText}>
                      {exercise.sets} sets × {exercise.reps} reps
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="calendar-outline" size={64} color="#333" />
              <Text style={styles.emptyStateText}>
                No exercises planned for this day
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Tap another date to see scheduled exercises
              </Text>
            </View>
          )}

          {/* Add Activity Button */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              // Handle add activity
              console.log("Add activity for", selectedDate);
            }}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={24} color="#000" />
            <Text style={styles.addButtonText}>Add Activity</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Exercise Log Modal */}
      {selectedExercise && (
        <ExerciseLogModal
          visible={isLogModalVisible}
          exerciseName={selectedExercise.name}
          exerciseType={selectedExercise.type}
          sets={selectedExercise.sets}
          reps={selectedExercise.reps}
          onClose={() => {
            setIsLogModalVisible(false);
            setSelectedExercise(null);
          }}
          onSave={(setsData) => {
            console.log("Saving exercise log:", selectedExercise, setsData);
            // Here you can save the data to your state or backend
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  calendarContainer: {
    backgroundColor: "#000",
  },
  customHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#1A1A1A",
  },
  headerArrow: {
    padding: 8,
  },
  headerDateText: {
    fontSize: 16,
    fontWeight: "normal",
    color: "#999",
    textTransform: "capitalize",
  },
  calendar: {
    borderWidth: 0,
    borderColor: "#000",
  },
  dayNamesHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1A1A1A",
    paddingVertical: 10,
    paddingHorizontal: 0,
  },
  dayNameText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#999",
    width: 40,
    textAlign: "center",
  },
  exercisesContainer: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  exercisesList: {
    flex: 1,
  },
  exerciseCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 12,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
  },
  typeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  typeText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  exerciseDetails: {
    flexDirection: "row",
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#999",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginTop: 16,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#444",
    marginTop: 8,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
});
