import React, { useState, useEffect } from 'react';
import { Cloud, Award, Eye, Sun, Moon, Wind, Umbrella, CloudRain } from 'lucide-react';

function App() {
  const [cloudCount, setCloudCount] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [timeWatched, setTimeWatched] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [weather, setWeather] = useState<'sunny' | 'rainy' | 'windy'>('sunny');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeWatched(prev => prev + 1);
      
      // Random weather changes
      if (Math.random() < 0.01) {
        setWeather(['sunny', 'rainy', 'windy'][Math.floor(Math.random() * 3)] as 'sunny' | 'rainy' | 'windy');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Completely pointless achievements
    if (cloudCount === 10) {
      setAchievements(prev => [...prev, "Novice Cloud Enthusiast"]);
    }
    if (cloudCount === 50) {
      setAchievements(prev => [...prev, "Professional Cloud Observer"]);
    }
    if (cloudCount === 100) {
      setAchievements(prev => [...prev, "Master of the Void"]);
    }
    if (timeWatched > 60) {
      setAchievements(prev => [...prev, "Time Waster Extraordinaire"]);
    }
  }, [cloudCount, timeWatched]);

  const handleCloudSpot = () => {
    setCloudCount(prev => prev + 1);
    setIsBlinking(true);
    setTimeout(() => setIsBlinking(false), 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-100 flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Professional Cloud Watcher™</h1>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="text-2xl font-semibold">
            <Cloud className="inline mr-2" />
            Clouds Spotted: {cloudCount}
          </div>
          <div className="text-xl">
            <Eye className={`inline mr-2 ${isBlinking ? 'animate-bounce' : ''}`} />
            Time Wasted: {Math.floor(timeWatched)}s
          </div>
        </div>

        <div className="flex justify-center mb-8">
          {weather === 'sunny' && <Sun size={100} className="text-yellow-500 animate-spin-slow" />}
          {weather === 'rainy' && <CloudRain size={100} className="text-gray-500 animate-bounce" />}
          {weather === 'windy' && <Wind size={100} className="text-blue-500 animate-pulse" />}
        </div>

        <button
          onClick={handleCloudSpot}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 active:scale-95"
        >
          Spot a Cloud!
        </button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2" />
            Pointless Achievements
          </h2>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-green-100 text-green-800 px-4 py-2 rounded-lg flex items-center">
                <Award className="mr-2" />
                {achievement}
              </div>
            ))}
            {achievements.length === 0 && (
              <div className="text-gray-500 italic">
                No achievements yet... Keep wasting time!
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          Warning: This application serves absolutely no purpose.
          <br />
          Side effects may include existential crisis and questioning life choices.
        </div>
      </div>
    </div>
  );
}

export default App;