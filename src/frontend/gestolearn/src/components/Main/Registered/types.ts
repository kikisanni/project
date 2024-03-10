
export interface Results {
    hearts: number;
    totalPoints: number;
    totalXP: number;
    categoryTotalPoints: number[];
    completed: number;
  
}

export interface ProgressBar {
    currentValue: number;
    maxValue: number;
    label: string;
}