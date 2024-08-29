use Dancer2;
set port => 6969;
# set public => path( dirname(__FILE__), '' )
 
get '/'=>sub{
    send_file '/home.html'
};


get '/example' => sub {
    # my $filename = "D:\\FullStack\\HostSync\\host";
    # my $handle  = undef;
    # open($handle,'<',$filename) || die 'Fuck uuuuu';
    # my $content = readline($handle);
    # close($handle);
    # return $content;
    send_file 'D:\FullStack\HostSync\host'
};
 
dance;