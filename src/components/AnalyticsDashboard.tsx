
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Users, Package, Clock, Target, Brain, Zap } from "lucide-react";

export const AnalyticsDashboard = () => {
  const metrics = [
    {
      title: "Delivery Success Rate",
      value: "94.8%",
      change: "+12.3%",
      trend: "up",
      icon: Target,
      description: "AI optimization improved success rate by 12.3% this month"
    },
    {
      title: "Average Delivery Time",
      value: "23 min",
      change: "-8.2%",
      trend: "down",
      icon: Clock,
      description: "Route optimization reduced delivery time by 8.2%"
    },
    {
      title: "Customer Satisfaction",
      value: "4.9/5",
      change: "+0.3",
      trend: "up",
      icon: Users,
      description: "Improved scheduling flexibility increased satisfaction"
    },
    {
      title: "Packages per Route",
      value: "18.4",
      change: "+15.7%",
      trend: "up",
      icon: Package,
      description: "AI routing optimization increased package density"
    }
  ];

  const aiInsights = [
    {
      title: "Peak Delivery Windows Identified",
      description: "AI detected optimal delivery windows: 2-4 PM (94% success) and 10 AM-12 PM (89% success)",
      impact: "High",
      category: "Time Optimization"
    },
    {
      title: "Customer Behavior Pattern",
      description: "85% of customers prefer weekday afternoon deliveries. Weekend morning slots show 78% acceptance.",
      impact: "Medium",
      category: "Customer Insights"
    },
    {
      title: "Route Efficiency Opportunity",
      description: "Consolidating suburban routes could reduce drive time by 23% and increase capacity by 8 deliveries/day.",
      impact: "High",
      category: "Route Optimization"
    },
    {
      title: "Weather Impact Analysis",
      description: "Rainy days show 31% higher missed delivery rates. Pre-emptive rescheduling recommended.",
      impact: "Medium",
      category: "Weather Intelligence"
    }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case "high": return "bg-gray-100 text-gray-800";
      case "medium": return "bg-gray-100 text-gray-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <metric.icon className="h-4 w-4 text-gray-600" />
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm font-medium text-gray-900">{metric.title}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.description}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>Monthly performance comparison</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Successful Deliveries</span>
                <span className="text-sm text-gray-600">94.8%</span>
              </div>
              <Progress value={94.8} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">On-Time Delivery</span>
                <span className="text-sm text-gray-600">87.2%</span>
              </div>
              <Progress value={87.2} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-sm text-gray-600">91.5%</span>
              </div>
              <Progress value={91.5} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Route Efficiency</span>
                <span className="text-sm text-gray-600">78.9%</span>
              </div>
              <Progress value={78.9} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Weekly Delivery Volume
            </CardTitle>
            <CardDescription>Package volume and success rates by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { day: "Monday", packages: 1247, success: 96 },
                { day: "Tuesday", packages: 1389, success: 94 },
                { day: "Wednesday", packages: 1156, success: 97 },
                { day: "Thursday", packages: 1298, success: 93 },
                { day: "Friday", packages: 1445, success: 89 },
                { day: "Saturday", packages: 892, success: 91 },
                { day: "Sunday", packages: 634, success: 95 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-sm font-medium w-20">{item.day}</div>
                  <div className="flex-1 mx-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>{item.packages} packages</span>
                      <span>{item.success}% success</span>
                    </div>
                    <Progress value={item.success} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-gray-600" />
            AI-Generated Insights
          </CardTitle>
          <CardDescription>
            Machine learning analysis of delivery patterns and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium">{insight.title}</div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {insight.category}
                    </Badge>
                    <Badge className={`text-xs ${getImpactColor(insight.impact)}`}>
                      {insight.impact} Impact
                    </Badge>
                  </div>
                </div>
                <div className="text-sm text-gray-600">{insight.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Optimization Status */}
      <Card className="bg-gray-50 border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-800">
            <Zap className="h-5 w-5" />
            AI Optimization Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-600">85%</div>
              <div className="text-sm text-gray-700">Reduction in Missed Deliveries</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600">$2.3M</div>
              <div className="text-sm text-gray-700">Annual Cost Savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">40%</div>
              <div className="text-sm text-gray-700">Increase in Customer Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
