export interface Task {
  id: number;
  task_topic: string;
  status: string; 
  priority: string; 
  created: Date;
  end_date: Date;
}
