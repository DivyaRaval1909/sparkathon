
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Truck, Brain, TrendingUp, Users, Package, Zap, CheckCircle, AlertCircle, Star } from "lucide-react";
import { DeliveryScheduler } from "@/components/DeliveryScheduler";
import { TrackingDashboard } from "@/components/TrackingDashboard";
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeTab, setActiveTab] = useState("schedule");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full flex justify-between items-center gap-4 py-4 px-6">
        <div className="flex items-center gap-2">
          <div className="p-3 bg-gray-900 rounded-2xl">
            <Brain className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">BitSnatchers</h1>
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900 mr-2">Account</span>
            <Avatar>
              <AvatarFallback>{user.email?.[0]?.toUpperCase() || '?'}</AvatarFallback>
            </Avatar>
            <span className="text-gray-900 text-sm font-medium">{user.email}</span>
            <Button size="sm" className="bg-gray-900 text-white ml-2" onClick={() => {auth.signOut(); navigate('/login');}}>Logout</Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login"><Button size="sm" className="bg-gray-900 text-white">Login</Button></Link>
            <Link to="/signup"><Button size="sm" variant="outline">Sign Up</Button></Link>
          </div>
        )}
      </div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-4">
        <div className="text-center mb-4">
          {/* Removed logo/title from here */}
          {/* Remove the following paragraph and badges */}
          {/* <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">Intelligent delivery scheduling that learns from customer behavior, predicts optimal time windows, and reduces missed deliveries by up to 85%</p> */}
          {/* <div className="flex flex-wrap justify-center gap-4 mb-8"> ... </div> */}
        </div>

        {/* Main Interface */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="bg-gray-900 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Truck className="h-6 w-6" />
              Smart Delivery Management System
            </CardTitle>
            <CardDescription className="text-gray-200">
              Experience the future of delivery scheduling with AI-powered optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="schedule" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Smart Scheduling
                </TabsTrigger>
                <TabsTrigger value="tracking" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Live Tracking
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="schedule">
                <DeliveryScheduler />
              </TabsContent>

              <TabsContent value="tracking">
                <TrackingDashboard />
              </TabsContent>

              <TabsContent value="analytics">
                <AnalyticsDashboard />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
