---
layout: post
title: PHP, Windows, and spaces in file names
date: '2013-01-04T18:06:53-05:00'
tags: []
tumblr_url: http://michaelehead.com/post/39691632876/php-windows-and-spaces-in-file-names
---
I hope that, in the future of operating systems, spaces and other "special characters" won't be such a big deal in programming. In attempting to run a system() command in PHP on a Windows machine, I ran into a lot of trouble getting to the "Program Files (x86)" directory, due to the spaces. 

So, 


{% highlight php %}
$output = '''';
system(''C:\Program Files (x86)\Prince\Engine\bin\prince.exe --version 2>&1'', $output);
echo $output; 
{% endhighlight %}

is bad, and doesn't work. You get the error
`''C:\Program'' is not recognized as an internal or external command, operable program or batch file.`
because it stops after the first space. Now, why would I, as a somewhat experienced developer, expect this to work? Because the Windows command line accepts directory names with spaces so long as they are in quotes. Well, the path argument in system() above was in (single) quotes, so I expected PHP to handle all that path just fine. I was wrong. One way to handle this is to write
 
{% highlight php %}
$output = '''';
system(''C:\Progra~2\Prince\Engine\bin\prince.exe --version 2>&1'', $output);
echo $output; 
{% endhighlight %}

which works fine. `Progra~2` here refers to the second matching directory name starting with "Progra". `Progra~1` is "Program Files", but I wanted to target "Program Files (x86)", thus the "~2" suffix instead of "~1".
