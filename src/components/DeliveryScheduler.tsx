
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, Clock, MapPin, User, Sparkles, Calendar, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface TimeSlot {
  id: string;
  time: string;
  date: string;
  probability: number;
  reason: string;
  price?: number;
  premium?: boolean;
}

export const DeliveryScheduler = () => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSlots, setAiSlots] = useState<TimeSlot[]>([]);

  // Simulate AI-generated time slots based on customer behavior
  const generateAISlots = () => {
    const slots: TimeSlot[] = [
      {
        id: "1",
        time: "2:00 PM - 4:00 PM",
        date: "Today",
        probability: 94,
        reason: "High success rate based on your delivery history",
        premium: false
      },
      {
        id: "2",
        time: "10:00 AM - 12:00 PM",
        date: "Tomorrow",
        probability: 89,
        reason: "Optimal window for your neighborhood",
        premium: false
      },
      {
        id: "3",
        time: "6:00 PM - 8:00 PM",
        date: "Today",
        probability: 76,
        reason: "Alternative evening slot",
        price: 4.99,
        premium: true
      },
      {
        id: "4",
        time: "9:00 AM - 11:00 AM",
        date: "Tomorrow",
        probability: 72,
        reason: "Early morning availability",
        premium: false
      }
    ];
    setAiSlots(slots);
  };

  useEffect(() => {
    // Simulate AI processing delay
    const timer = setTimeout(() => {
      generateAISlots();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleScheduleDelivery = () => {
    if (!selectedSlot) {
      toast.error("Please select a delivery window");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Delivery scheduled successfully! You'll receive SMS/email confirmation.");
      setIsLoading(false);
    }, 2000);
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 90) return "text-green-600";
    if (probability >= 80) return "text-blue-600";
    if (probability >= 70) return "text-yellow-600";
    return "text-orange-600";
  };

  const getProbabilityBadgeColor = (probability: number) => {
    return "bg-black text-white";
  };

  return (
    <div className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Delivery Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="customer">Customer Name</Label>
              <Input 
                id="customer"
                placeholder="Enter customer name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Delivery Address</Label>
              <Input 
                id="address"
                placeholder="Enter delivery address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI-Powered Time Slots */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI-Recommended Delivery Windows
          </CardTitle>
          <CardDescription>
            Our AI analyzes customer behavior, traffic patterns, and historical data to suggest optimal delivery times
          </CardDescription>
        </CardHeader>
        <CardContent>
          {aiSlots.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">AI is analyzing optimal delivery windows...</span>
            </div>
          ) : (
            <div className="grid gap-4">
              {aiSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSlot === slot.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedSlot(slot.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <span className="font-medium">{slot.date}</span>
                      <Clock className="h-4 w-4 text-gray-600 ml-2" />
                      <span className="font-medium">{slot.time}</span>
                      {slot.premium && (
                        <Badge variant="secondary" className="ml-2">
                          Express +${slot.price}
                        </Badge>
                      )}
                    </div>
                    <Badge className={getProbabilityBadgeColor(slot.probability)}>
                      {slot.probability}% Success Rate
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span>{slot.reason}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Brain className="h-5 w-5 text-gray-700" />
            Smart Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-gray-700" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Customer Preference Detected</div>
                <div className="text-sm text-gray-700">
                  This customer typically accepts deliveries between 2-4 PM on weekdays
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-full">
                <AlertCircle className="h-4 w-4 text-gray-700" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Traffic Optimization</div>
                <div className="text-sm text-gray-700">
                  Route efficiency is 23% better during recommended time slots
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Button */}
      <div className="flex justify-center">
        <Button 
          size="lg" 
          className="px-8 py-3 bg-gray-900 text-white hover:bg-gray-800"
          onClick={handleScheduleDelivery}
          disabled={isLoading || !selectedSlot}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Scheduling Delivery...
            </>
          ) : (
            <>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Smart Delivery
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
