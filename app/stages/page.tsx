'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { ChevronLeft, Swords, Star } from 'lucide-react';
import { STAGES } from '@/src/config/stages';

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < level ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'}`}
        />
      ))}
    </div>
  );
}

export default function StagesPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="cyber-card rounded-xl p-6 flex items-center space-x-4 bg-white">
          <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            size="icon"
            className="cyber-button border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 uppercase tracking-tight flex items-center">
              <Swords className="w-8 h-8 mr-2 text-red-600" />
              Stage Select
            </h1>
            <p className="text-neutral-600 font-mono">挑戦するステージを選んでください</p>
          </div>
        </div>

        {/* Stage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {STAGES.map((stage) => (
            <Card
              key={stage.id}
              className="cyber-card border-2 border-neutral-900 cursor-pointer hover:bg-neutral-50 transition-all hover:scale-[1.02]"
              onClick={() => router.push(`/battle/${stage.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-400 font-mono uppercase">
                    Stage {stage.id}
                  </span>
                  <DifficultyStars level={stage.difficulty} />
                </div>
                <CardTitle className="text-xl font-black text-neutral-900 uppercase tracking-tight">
                  {stage.name}
                </CardTitle>
                <CardDescription className="text-neutral-500 font-mono text-sm">
                  {stage.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full bg-neutral-900 text-white hover:bg-red-700 font-bold uppercase tracking-wider transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/battle/${stage.id}`);
                  }}
                >
                  <Swords className="w-4 h-4 mr-2" />
                  挑戦する
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
