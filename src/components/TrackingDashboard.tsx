
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { MapPin, Truck, Clock, Route, Zap, Navigation } from "lucide-react";
import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox';

interface Delivery {
  id: string;
  customer: string;
  address: string;
  status: "pending" | "in-transit" | "out-for-delivery" | "delivered";
  estimatedTime: string;
  actualTime?: string;
  driverName: string;
  progress: number;
  aiOptimized: boolean;
}

export const TrackingDashboard = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null);

  useEffect(() => {
    // Simulate real-time delivery data
    const mockDeliveries: Delivery[] = [
      {
        id: "DEL001",
        customer: "Divya Raval",
        address: "Nirma University, Ahmedabad",
        status: "out-for-delivery",
        estimatedTime: "2:30 PM",
        driverName: "Mike Rodriguez",
        progress: 85,
        aiOptimized: true
      },
      {
        id: "DEL002",
        customer: "Robert Chen",
        address: "456 Pine Avenue, Suburbs",
        status: "in-transit",
        estimatedTime: "3:15 PM",
        driverName: "Lisa Park",
        progress: 45,
        aiOptimized: true
      },
      {
        id: "DEL003",
        customer: "Emma Wilson",
        address: "789 Maple Drive, Eastside",
        status: "delivered",
        estimatedTime: "1:00 PM",
        actualTime: "12:58 PM",
        driverName: "John Smith",
        progress: 100,
        aiOptimized: false
      },
      {
        id: "DEL004",
        customer: "David Brown",
        address: "321 Cedar Lane, Westend",
        status: "pending",
        estimatedTime: "4:00 PM",
        driverName: "Maria Garcia",
        progress: 15,
        aiOptimized: true
      }
    ];

    setDeliveries(mockDeliveries);
    setSelectedDelivery(mockDeliveries[0].id);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-gray-100 text-gray-800";
      case "out-for-delivery": return "bg-gray-100 text-gray-800";
      case "in-transit": return "bg-gray-100 text-gray-800";
      case "pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <MapPin className="h-4 w-4" />;
      case "out-for-delivery": return <Truck className="h-4 w-4" />;
      case "in-transit": return <Route className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const selectedDeliveryData = deliveries.find(d => d.id === selectedDelivery);

  const WALMART_COORDS = [-73.985664, 40.748514]; // Example: Walmart NYC
  const CUSTOMER_COORDS = {
    '123 Oak Street, Downtown': [-73.9851, 40.749],
    '456 Pine Avenue, Suburbs': [-73.9805, 40.751],
    '789 Maple Drive, Eastside': [-73.982, 40.747],
    '321 Cedar Lane, Westend': [-73.987, 40.746],
  };
  const MAPBOX_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN'; // <-- Replace with your Mapbox token

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Active Deliveries
            </CardTitle>
            <CardDescription>
              Real-time tracking of all deliveries with AI optimization status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {deliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedDelivery === delivery.id
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedDelivery(delivery.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{delivery.customer}</div>
                    <div className="flex items-center gap-2">
                      {delivery.aiOptimized && (
                        <Badge variant="secondary" className="text-xs">
                          <Zap className="h-3 w-3 mr-1" />
                          AI Optimized
                        </Badge>
                      )}
                      <Badge className={getStatusColor(delivery.status)}>
                        {getStatusIcon(delivery.status)}
                        <span className="ml-1 capitalize">{delivery.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">{delivery.address}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      Driver: {delivery.driverName}
                    </div>
                    <div className="text-xs text-gray-500">
                      ETA: {delivery.estimatedTime}
                    </div>
                  </div>
                  <Progress value={delivery.progress} className="mt-2 h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Detailed View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Navigation className="h-5 w-5" />
              Delivery Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDeliveryData ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold">{selectedDeliveryData.customer}</div>
                  <div className="text-gray-600">{selectedDeliveryData.address}</div>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        className="text-gray-200"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - selectedDeliveryData.progress / 100)}`}
                        className="text-gray-600 transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">{selectedDeliveryData.progress}%</div>
                        <div className="text-xs text-gray-500">Complete</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-800">Status</div>
                    <div className="capitalize text-gray-600">{selectedDeliveryData.status.replace('-', ' ')}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-800">Driver</div>
                    <div className="text-gray-600">{selectedDeliveryData.driverName}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-800">Estimated Time</div>
                    <div className="text-gray-600">{selectedDeliveryData.estimatedTime}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="font-medium text-gray-800">AI Optimized</div>
                    <div className="text-gray-600">{selectedDeliveryData.aiOptimized ? "Yes" : "No"}</div>
                  </div>
                </div>

                {selectedDeliveryData.aiOptimized && (
                  <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 font-medium text-gray-800 mb-2">
                      <Zap className="h-4 w-4" />
                      AI Optimization Active
                    </div>
                    <div className="text-sm text-gray-700">
                      Route optimized for 15% faster delivery. Customer availability window confirmed through behavioral analysis.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Select a delivery to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Real-time Map Simulation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Live Delivery Map
          </CardTitle>
          <CardDescription>
            Real-time visualization of delivery routes and driver locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-100 rounded-lg p-0 overflow-hidden" style={{height: 400}}>
            {selectedDeliveryData && (
              <iframe
                title="Simple Map"
                width="100%"
                height="400"
                frameBorder="0"
                style={{ border: 0 }}
                src={`https://www.openstreetmap.org/export/embed.html?bbox=-73.99,40.74,-73.97,40.76&layer=mapnik&marker=40.748514,-73.985664`}
                allowFullScreen
              ></iframe>
            )}
            {!selectedDeliveryData && (
              <div className="flex items-center justify-center h-full text-gray-500">Select a delivery to view the map</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
