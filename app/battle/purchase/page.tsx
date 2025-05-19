"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Coins, CreditCard, Shield, Sparkles, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function BattlePurchasePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState("standard")
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("tokens")

  const plans = {
    basic: {
      name: "Basic Battle Pass",
      price: 10,
      tokens: 10,
      features: ["5 Battle Entries", "Standard Matchmaking", "Basic Rewards"],
    },
    standard: {
      name: "Standard Battle Pass",
      price: 25,
      tokens: 25,
      features: ["15 Battle Entries", "Priority Matchmaking", "Standard Rewards", "1 Free Skip"],
    },
    premium: {
      name: "Premium Battle Pass",
      price: 50,
      tokens: 50,
      features: [
        "Unlimited Battles for 7 days",
        "Instant Matchmaking",
        "Premium Rewards",
        "3 Free Skips",
        "Exclusive Badges",
      ],
    },
  }

  const selectedPlanDetails = plans[selectedPlan as keyof typeof plans]
  const totalPrice = selectedPlanDetails.price * quantity
  const totalTokens = selectedPlanDetails.tokens * quantity

  const handlePurchase = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Purchase Successful!",
        description: `You've purchased ${quantity} ${selectedPlanDetails.name}${quantity > 1 ? "es" : ""}!`,
      })

      router.push("/battle")
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your purchase. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/battle")} className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">Battle Pass Purchase</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={`border-2 transition-all ${selectedPlan === "basic" ? "border-primary" : "border-muted"}`}>
          <CardHeader className="pb-2">
            <Badge className="self-start mb-2 bg-blue-500">Basic</Badge>
            <CardTitle>Basic Battle Pass</CardTitle>
            <CardDescription>Perfect for casual players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              <span className="text-primary">{plans.basic.tokens}</span>
              <span className="text-muted-foreground text-lg"> tokens</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plans.basic.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPlan === "basic" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPlan("basic")}
            >
              {selectedPlan === "basic" ? "Selected" : "Select"}
            </Button>
          </CardFooter>
        </Card>

        <Card className={`border-2 transition-all ${selectedPlan === "standard" ? "border-primary" : "border-muted"}`}>
          <CardHeader className="pb-2">
            <Badge className="self-start mb-2 bg-purple-500">Popular</Badge>
            <CardTitle>Standard Battle Pass</CardTitle>
            <CardDescription>Best value for most users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              <span className="text-primary">{plans.standard.tokens}</span>
              <span className="text-muted-foreground text-lg"> tokens</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plans.standard.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPlan === "standard" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPlan("standard")}
            >
              {selectedPlan === "standard" ? "Selected" : "Select"}
            </Button>
          </CardFooter>
        </Card>

        <Card className={`border-2 transition-all ${selectedPlan === "premium" ? "border-primary" : "border-muted"}`}>
          <CardHeader className="pb-2">
            <Badge className="self-start mb-2 bg-amber-500">Premium</Badge>
            <CardTitle>Premium Battle Pass</CardTitle>
            <CardDescription>Ultimate experience for serious players</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-4">
              <span className="text-primary">{plans.premium.tokens}</span>
              <span className="text-muted-foreground text-lg"> tokens</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plans.premium.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              variant={selectedPlan === "premium" ? "default" : "outline"}
              className="w-full"
              onClick={() => setSelectedPlan("premium")}
            >
              {selectedPlan === "premium" ? "Selected" : "Select"}
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
            <CardDescription>Review your battle pass purchase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{selectedPlanDetails.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedPlanDetails.tokens} tokens per pass</p>
              </div>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="mx-3 font-medium">{quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{totalTokens} tokens</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>0 tokens</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{totalTokens} tokens</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-700 dark:text-blue-400">Secure Purchase</h4>
                  <p className="text-sm text-blue-600/80 dark:text-blue-400/80">
                    Your battle passes will be instantly added to your account after purchase.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose how you want to pay</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-primary bg-primary/5">
                <RadioGroupItem value="tokens" id="tokens" />
                <Label htmlFor="tokens" className="flex items-center gap-2 cursor-pointer">
                  <Coins className="h-5 w-5 text-yellow-500" />
                  <div>
                    <span className="font-medium">Pay with Tokens</span>
                    <p className="text-sm text-muted-foreground">Use your existing tokens</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-muted">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <div>
                    <span className="font-medium">Credit/Debit Card</span>
                    <p className="text-sm text-muted-foreground">Pay securely with your card</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-muted">
                <RadioGroupItem value="upi" id="upi" />
                <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <div>
                    <span className="font-medium">UPI</span>
                    <p className="text-sm text-muted-foreground">Pay using UPI apps</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>

            {paymentMethod === "tokens" && (
              <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-900/30">
                <div className="flex items-start gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-700 dark:text-yellow-400">Token Balance</h4>
                    <p className="text-sm text-yellow-600/80 dark:text-yellow-400/80">
                      You have 156 tokens available. This purchase will use {totalTokens} tokens.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upi-id">UPI ID</Label>
                  <Input id="upi-id" placeholder="name@upi" />
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={handlePurchase} disabled={isLoading}>
              {isLoading ? "Processing..." : `Purchase for ${totalTokens} tokens`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
