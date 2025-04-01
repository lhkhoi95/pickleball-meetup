import { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Loader2 } from "lucide-react";

interface Location {
  place_id: string;
  description: string;
}

interface LocationSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function LocationSearch({ value, onChange }: LocationSearchProps) {
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [open, setOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchSuggestions = async () => {
      if (!value || isSelected) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      setOpen(true);

      try {
        const response = await fetch(`/api/places/autocomplete?input=${encodeURIComponent(value)}`);
        const data = await response.json();
        setSuggestions(data.predictions || []);
      } catch (error) {
        console.error('Failed to fetch suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    timeoutId = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [value, isSelected]);

  return (
    <Command>
      <div className="relative">
        <CommandInput
          value={value}
          onValueChange={(newValue) => {
            setIsSelected(false);
            onChange(newValue);
          }}
          placeholder="Enter your location..."
        />
        {isLoading && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      {open && !isSelected && (
        <CommandGroup>
          {suggestions.length === 0 ? (
            <CommandEmpty className="py-2 text-sm text-muted-foreground">No locations found</CommandEmpty>
          ) : (
            suggestions.map((suggestion) => (
              <CommandItem
                key={suggestion.place_id}
                value={suggestion.description}
                onSelect={(value: string) => {
                  onChange(value);
                  setIsSelected(true);
                  setOpen(false);
                }}
              >
                {suggestion.description}
              </CommandItem>
            ))
          )}
        </CommandGroup>
      )}
    </Command>
  );
}