import { Button,ScrollArea, ScrollBar } from '@/components/ui'

interface TimeSelectorProps {
    label:string,
    time:any,
    onChange:any
}

export const TimeSelector = ({ label, time, onChange }:TimeSelectorProps) => (
    <div>
      <h1 className='mb-2'>{label}</h1>
      <div className="flex border lg:h-[307px] rounded-md flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x">
        {["hour", "minute", "ampm"].map((type, idx) => (
          <ScrollArea key={type} className="sm:w-auto">
            <div className="flex sm:flex-col p-2">
              {type === "hour" && Array.from({ length: 12 }, (_, i) => i + 1).map((v) => (
                <Button key={v} size="icon" variant={time.hour === v ? "default" : "ghost"} className="sm:w-full aspect-square" onClick={() => onChange("hour", v)}>{v}</Button>
              ))}
              {type === "minute" && Array.from({ length: 12 }, (_, i) => i * 5).map((v) => (
                <Button key={v} size="icon" variant={time.minute === v ? "default" : "ghost"} className="sm:w-full aspect-square" onClick={() => onChange("minute", v)}>{v.toString().padStart(2, '0')}</Button>
              ))}
              {type === "ampm" && ["AM", "PM"].map((v) => (
                <Button key={v} size="icon" variant={time.ampm === v ? "default" : "ghost"} className="sm:w-full aspect-square" onClick={() => onChange("ampm", v)}>{v}</Button>
              ))}
            </div>
            {idx === 1 && <ScrollBar orientation="horizontal" className="sm:hidden" />}
          </ScrollArea>
        ))}
      </div>
    </div>
  )
  