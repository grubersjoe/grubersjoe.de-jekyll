# Outputs the reading time, as a number

# Read this in "4 minutes"
# Usage: Read this in {{ page.content | reading_time }}

WORDS_PER_MINUTE = 180

def calculate_time(input)
  words = input.split.size
  minutes = (words.to_f / WORDS_PER_MINUTE).round
  return minutes, 'Min'
end

def output(minutes, label)
  "<span class='reading-time'>#{minutes}</span> <span class='reading-time-label'>#{label}</span>"
end

module ReadingTimeFilterAsInteger
  def reading_time(input)
    minutes, label = calculate_time(input)
    minutes > 0 ? output(minutes, label): output('weniger als eine', 'Minute')
  end

  Liquid::Template.register_filter(ReadingTimeFilterAsInteger)
end